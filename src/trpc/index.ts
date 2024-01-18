import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  adminProcedure,
  privateProcedure,
  publicProcedure,
  router,
} from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { z } from "zod";
import { updateUserRole } from "./admin";
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query";
import { absoluteURL } from "@/lib/utils";
import { getUserSubscriptionPlan, stripe } from "@/lib/stripe";
import { PLANS } from "@/config/stripe";

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const currentUser = getUser();

    if (!currentUser.id || !currentUser.email) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    //check user in Database
    const dbUser = await db.user.findFirst({
      where: {
        id: currentUser.id,
      },
    });

    if (!dbUser) {
      // create user in DB
      await db.user.create({
        data: {
          id: currentUser.id,
          email: currentUser.email,
          first_name: currentUser.given_name,
          last_name: currentUser.family_name,
        },
      });
    }

    return { success: true, user: dbUser };
  }),
  getUserByEmail: privateProcedure.query(async ({ ctx }) => {
    if (ctx.email) {
      return await db.user.findFirst({
        where: {
          email: ctx.email,
        },
      });
    }
  }),
  getAllUsers: privateProcedure.query(async () => {
    return await db.user.findMany({
      select: {
        email: true,
        first_name: true,
        last_name: true,
        joinedAt: true,
        is_admin: true,
        is_advisor: true,
        rating: true,
      },
    });
  }),
  updateUserRole: updateUserRole,
  getFileUploadStatus: privateProcedure
    .input(z.object({ fileId: z.string() }))
    .query(async ({ input, ctx }) => {
      const file = await db.file.findFirst({
        where: {
          id: input.fileId,
          userId: ctx.userId,
        },
      });

      if (!file) return { status: "PENDING" as const };

      return { status: file.uploadStatus };
    }),
  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    return await db.file.findMany({
      where: {
        userId,
      },
    });
  }),
  getFile: privateProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const file = db.file.findFirst({
        where: {
          key: input.key,
          userId,
        },
      });

      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      return file;
    }),
  deleteFile: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const file = await db.file.findFirst({
        where: {
          id: input.id,
          userId,
        },
      });

      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      await db.file.delete({
        where: {
          id: input.id,
        },
      });

      return file;
    }),
  getFileMessages: privateProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        fileId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { fileId, cursor } = input;
      const limit = input.limit ?? INFINITE_QUERY_LIMIT;

      const file = await db.file.findFirst({
        where: {
          id: fileId,
          userId,
        },
      });

      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      const messages = await db.message.findMany({
        take: limit + 1,
        where: {
          fileId,
        },
        orderBy: {
          createdAt: "desc",
        },
        cursor: cursor ? { id: cursor } : undefined,
        select: {
          id: true,
          isUserMessage: true,
          createdAt: true,
          text: true,
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;

      if (messages.length > limit) {
        const nextItem = messages.pop();
        nextCursor = nextItem?.id;
      }

      return { messages, nextCursor };
    }),
    createStripeSession: privateProcedure.mutation(async ({ctx}) => {
      const {userId} = ctx
      
      if(!userId) throw new TRPCError({code: "UNAUTHORIZED"})
      
      const billingUrl = absoluteURL("/dashboard/billing")

      const dbUser = await db.user.findFirst({
        where: {
          id: userId
        }
      })

      if(!dbUser) throw new TRPCError({code: "UNAUTHORIZED"})

      const subscriptionPlan = await getUserSubscriptionPlan()

      if(subscriptionPlan.isSubscribed && dbUser.stripeCustomerId){
        const stripeSession = await stripe.billingPortal.sessions.create({
          customer: dbUser.stripeCustomerId,
          return_url: billingUrl
        })
        return {url: stripeSession.url}
      }

      const stripeSession = await stripe.checkout.sessions.create({
        success_url: billingUrl,
        cancel_url: billingUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "required",
        line_items: [
          {
            price: PLANS.find((plan) => plan.name === "Pro")?.price.priceIds.test,
            quantity: 1
          }
        ],
        metadata: {
          userId: userId
        }
      })

      return {url: stripeSession.url}

    })
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
