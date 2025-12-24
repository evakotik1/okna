import { eq, isNull } from "drizzle-orm"
import Elysia from "elysia"
import z from "zod"
import { products } from "../../db/schema"
import { db } from "../../db"
import { productSchema } from "@/app/lib/shared/schemas/products"
import { userServise } from "./user"
import { DEFAULT_TTL, InvalidateCached, ServeCached } from "../../redis"

export const productsRouter = new Elysia({
    prefix: "/products"
})
.use(userServise)

.get("/", async () => {
    return await ServeCached(["public", "products"], DEFAULT_TTL, async () => 
    await db.query.products.findMany({
        where:isNull(products.deletedAt)
    })
    )
})


.get("/admin", async () => {
    return await ServeCached(["admin", "products"], DEFAULT_TTL, async () => 
    await db.query.products.findMany()
)
}, {
    whichRole: "admin"
})

.post("/admin", async ({ body }) => {
    const result = await db.insert(products).values(body).returning()
    await InvalidateCached(["admin", "products"])
    await InvalidateCached(["public", "products"])
    return result
}, {
    body: productSchema,
    whichRole: "admin"
})

.put("/admin/:id", async ({ params, body }) => {
    const result = await db.update(products).set(body).where(eq(products.id, params.id)).returning()
    
    await InvalidateCached(["admin", "products"])
    await InvalidateCached(["public", "products"])
    return result;
}, {
    params: z.object({
    id: z.string() 
    }),
    body: productSchema.partial(),
    whichRole: "admin"
})

.delete("/admin/:id", async ({ params }) => {
    await db.update(products).set({ deletedAt: new Date()}).where(eq(products.id, params.id))

    await InvalidateCached(["admin", "products"])
    await InvalidateCached(["public", "products"])
    return { success: true }
}, {
    params: z.object({ 
    id: z.string() 
    }),
    whichRole: "admin"
})