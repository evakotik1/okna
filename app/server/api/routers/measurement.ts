import { eq } from "drizzle-orm"
import Elysia from "elysia"
import z from "zod"
import { measurement } from "../../db/schema"
import { db } from "../../db"
import { measurementSchema } from "@/app/lib/shared/schemas/measuremen"
import { userServise } from "./user"
import { DEFAULT_TTL, InvalidateCached, ServeCached } from "../../redis"


export const measurementRouter = new Elysia({
  prefix: "/measurement"
})
.use(userServise)


.post("/", async ({body}) => {
  const result = await db.insert(measurement).values(body).returning();
  await InvalidateCached(["admin", "measurements"]);
  return result;
}, {
  body: measurementSchema
})








.get("/admin", async () => {
  return await ServeCached(["admin", "measurements"], DEFAULT_TTL, async () => 
      await db.query.measurement.findMany()
  )
}, {
  whichRole: "admin"
})

.post("/admin", async ({ body }) => {
  const result = await db.insert(measurement).values(body).returning()
  await InvalidateCached(["admin", "measurements"])
  return result
}, {
  body: measurementSchema,
  whichRole: "admin"
})

.put("/admin/:id", async ({ params, body }) => {
  const result = await db.update(measurement).set(body).where(eq(measurement.id, params.id)).returning()
  await InvalidateCached(["admin", "measurements"])
  return result;
}, {
  params: z.object({
    id: z.string() 
  }),
  body: measurementSchema,
  whichRole: "admin"
})

.delete("/admin/:id", async ({ params }) => {
  await db.delete(measurement).where(eq(measurement.id, params.id))
  await InvalidateCached(["admin", "measurements"])
  return { success: true }
}, {
  params: z.object({ 
    id: z.string() 
  }),
  whichRole: "admin"
})