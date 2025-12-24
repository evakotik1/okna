import { eq, isNull } from "drizzle-orm"
import Elysia from "elysia"
import z from "zod"
import { services } from "../../db/schema"
import { db } from "../../db"
import { serviceSchema } from "@/src/lib/shared/schemas/services"
import { userServise } from "./user"
import { DEFAULT_TTL, InvalidateCached, ServeCached } from "../../redis"

export const servicesRouter = new Elysia({
    prefix: "/services"
})
.use(userServise)

.get("/", async () => {
    return await ServeCached(["public", "services"], DEFAULT_TTL, async () => 
    await db.query.services.findMany({
        where: isNull(services.deletedAt)
    })
    )
})


.get("/admin", async () => {
    return await ServeCached(["admin", "services"], DEFAULT_TTL, async () => 
    await db.query.services.findMany()
)
}, {
    whichRole: "admin"
})

.post("/admin", async ({ body }) => {
    const result = await db.insert(services).values(body).returning()
    await InvalidateCached(["admin", "services"])
    await InvalidateCached(["public", "services"])
    return result
}, {
    body: serviceSchema,
    whichRole: "admin"
})

.put("/admin/:id", async ({ params, body }) => {
    const result = await db.update(services).set(body).where(eq(services.id, params.id)).returning()
    
    await InvalidateCached(["admin", "services"])
    await InvalidateCached(["public", "services"])
    return result;
}, {
    params: z.object({
    id: z.string() 
    }),
    body: serviceSchema.partial(),
    whichRole: "admin"
})

.delete("/admin/:id", async ({ params }) => {
    await db.update(services).set({ deletedAt: new Date()}).where(eq(services.id, params.id))

    await InvalidateCached(["admin", "services"])
    await InvalidateCached(["public", "services"])
    return { success: true }
}, {
    params: z.object({ 
    id: z.string() 
    }),
    whichRole: "admin"
})