import { TRPCError } from "@trpc/server";
import { adminProcedure, privateProcedure } from "./trpc";
import { db } from "@/db";
import { z } from "zod";

export const updateUserRole = privateProcedure
  .input(
    z.object({
      email: z.string(),
      is_admin: z.boolean(),
      is_advisor: z.boolean(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    if (!ctx.userId) throw new TRPCError({ code: "FORBIDDEN" });
    const user = await db.user.update({
      where: {
        email: input.email,
      },
      data: {
        is_admin: input.is_admin,
        is_advisor: input.is_advisor,
      },
    });
    return { success: true };
  });
