import { eq } from "drizzle-orm"
import Elysia from "elysia"
import z from "zod"
import { reviews } from "../../db/schema"
import { db } from "../../db"
import { userServise } from "./user"
import { DEFAULT_TTL, InvalidateCached, ServeCached } from "../../redis"
import { reviewsSchema } from "@/app/lib/shared/schemas/reviews"


export const reviewsRouter = new Elysia({
  prefix: "/reviews"
})
.use(userServise)


.post("/", async ({body}) => {
  const result = await db.insert(reviews).values(body).returning();
  await InvalidateCached(["admin", "reviews"]);
  return result;
}, {
  body: reviewsSchema
})








.get("/admin", async () => {
  return await ServeCached(["admin", "reviews"], DEFAULT_TTL, async () => 
      await db.query.reviews.findMany()
  )
}, {
  whichRole: "admin"
})

.post("/admin", async ({ body }) => {
  const result = await db.insert(reviews).values(body).returning()
  await InvalidateCached(["admin", "reviews"])
  return result
}, {
  body: reviewsSchema,
  whichRole: "admin"
})

.put("/admin/:id", async ({ params, body }) => {
  const result = await db.update(reviews).set(body).where(eq(reviews.id, params.id)).returning()
  await InvalidateCached(["admin", "reviews"])
  return result;
}, {
  params: z.object({
    id: z.string() 
  }),
  body: reviewsSchema,
  whichRole: "admin"
})

.delete("/admin/:id", async ({ params }) => {
  await db.delete(reviews).where(eq(reviews.id, params.id))
  await InvalidateCached(["admin", "reviews"])
  return { success: true }
}, {
  params: z.object({ 
    id: z.string() 
  }),
  whichRole: "admin"
})