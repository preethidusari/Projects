import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { privateProcedure, publicProcedure, router } from "@/trpc/config";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";

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
});
