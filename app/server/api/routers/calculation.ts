import { eq } from "drizzle-orm"
import Elysia from "elysia"
import z from "zod"
import { calculation } from "../../db/schema"
import { db } from "../../db"
import { userServise } from "./user"
import { DEFAULT_TTL, InvalidateCached, ServeCached } from "../../redis"
import { calculationSchema } from "@/app/lib/shared/schemas/calculation"


export const calculationRouter = new Elysia({
  prefix: "/calculation"
})
.use(userServise)

.get("/", async () => {
  return await db.query.calculation.findMany({
    orderBy: (calculation, { desc }) => [desc(calculation.createdAt)]
  })
})


.post("/", async ({body}) => {
  const result = await db.insert(calculation).values(body).returning();
  await InvalidateCached(["admin", "calculations"]);
  return result;
}, {
  body: calculationSchema
})








.get("/admin", async () => {
  return await ServeCached(["admin", "calculations"], DEFAULT_TTL, async () => 
      await db.query.calculation.findMany()
  )
}, {
  whichRole: "admin"
})

.post("/admin", async ({ body }) => {
  const result = await db.insert(calculation).values(body).returning()
  await InvalidateCached(["admin", "calculations"])
  return result
}, {
  body: calculationSchema,
  whichRole: "admin"
})

.put("/admin/:id", async ({ params, body }) => {
  const result = await db.update(calculation).set(body).where(eq(calculation.id, params.id)).returning()
  await InvalidateCached(["admin", "calculations"])
  return result;
}, {
  params: z.object({
    id: z.string() 
  }),
  body: calculationSchema,
  whichRole: "admin"
})

.delete("/admin/:id", async ({ params }) => {
  await db.delete(calculation).where(eq(calculation.id, params.id))
  await InvalidateCached(["admin", "calculations"])
  return { success: true }
}, {
  params: z.object({ 
    id: z.string() 
  }),
  whichRole: "admin"
})