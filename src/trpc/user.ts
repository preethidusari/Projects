import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { privateProcedure, publicProcedure, router } from "@/trpc/config";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { QuestionFormSchema } from "@/types/questionFormSchema";

export const UserRouter = router({
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
  askQuestion: publicProcedure
    .input(QuestionFormSchema)
    .mutation(async ({ input }) => {
      if (input.category === "") {
        throw new TRPCError({
          message: "Please select a Category",
          code: "BAD_REQUEST",
        });
      }
      return await db.userQueries.create({
        data: {
          userEmail: input.email!,
          userName: input.name!,
          userLocation: input.city,
          queryCategory: input.category,
          querySubject: input.subject,
          userQuery: input.query,
        },
      });
    }),
  getUserQueriesByEmail: privateProcedure.query(async ({ ctx }) => {
    if (!ctx.email) {
      throw new TRPCError({
        message: "Cannot find your Email. Please Login",
        code: "UNAUTHORIZED",
      });
    }
    const userQueries = await db.userQueries.findMany({
      where: {
        userEmail: ctx.email,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return userQueries;
  }),
});
