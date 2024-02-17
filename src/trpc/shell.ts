import { z } from "zod";
import { router, shellProcedure } from "./config";
import { db } from "@/db";
import { TRPCError } from "@trpc/server";

export const ShellRouter = router({
  getUserFiles: shellProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    return await db.file.findMany({
      where: {
        userId,
        isSecured: true
      },
    });
  }),
  getFile: shellProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const file = db.file.findFirst({
        where: {
          key: input.key,
          userId,
          isSecured: true,
        },
      });

      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

      return file;
    }),
});
