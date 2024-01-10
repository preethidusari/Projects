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

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const currentUser = getUser();

    if (!currentUser.id || !currentUser.email) {
      console.log("false");
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
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
