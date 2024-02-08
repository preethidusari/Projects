import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { TRPCError, initTRPC } from '@trpc/server';

const t = initTRPC.create();

const middleware = t.middleware

const isAuthenticated = middleware(async (opts) => {
    const { getUser } = getKindeServerSession()
    const user = getUser()

    if (!user || !user.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
    }
    return opts.next({
        ctx: {
            userId: user.id,
            email: user.email
        }
    })
})

const isAdmin = middleware(async (opts) => {
    const { getUser } = getKindeServerSession()
    const loggedUser = getUser()

    if (!loggedUser || !loggedUser.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" })
    }
    const user = await db.user.findFirst({
        where: {
          id: loggedUser.id,
        },
        select: {
            id: true,
            is_admin: true
        }
      });

    if (!user?.is_admin) throw new TRPCError({ code: "FORBIDDEN" });

    return opts.next({
        ctx: {
            userId: user.id,
            is_admin: user.is_admin
        }
    })
})

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuthenticated)
export const adminProcedure = t.procedure.use(isAdmin)