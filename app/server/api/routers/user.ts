import { Context, Elysia } from "elysia";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { user } from "../../db/auth-schema";
import { auth } from "../../auth/auth";
import { userMiddleware } from "../middleware/auth";

export const userServise = new Elysia({
    name: "user/service"
})
.derive({ as: "global"}, async ({headers}) => await userMiddleware(headers))
.macro({
    isSignedIn: (enabled? : boolean) => {
        if (!enabled) return;
        return {
            beforeHandle({session}) {
                if (!session?.user) {
                    throw new Response(JSON.stringify({
                        message: "Вы должны войти в систему"
                    }), {status: 401})
                }
            }
        }
    }
})
.macro({
    whichRole: (role: string) => {
        return {
            beforeHandle({session}) {
                if (!session?.user) {
                    throw new Response(JSON.stringify({
                        message: "Вы должны войти в систему"
                    }), {status: 401})
                }
                if (session.user.role !== role) {
                    throw new Response(JSON.stringify({
                        message: "Недостаточно прав"
                    }), {status: 403})
                }
            }
        }
    }
})


export const userRouterPrefix = new Elysia({
    prefix: "/user"
})
.use(userServise)
.get("/me", async ({session}) => {
    return await db.query.user.findFirst({
        where: eq(user.id, session!.user.id)
    })
}, {
    isSignedIn: true,
})


const betterAuthView = async (context: Context) => {
    const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"]
    if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
        return auth.handler(context.request)
    } else {
        return new Response("Method Not Allowed", { status: 405 })
    }
}

export const userRouter = new Elysia().all("/auth/*", betterAuthView).use(userRouterPrefix)