import { eq } from "drizzle-orm"
import Elysia from "elysia"
import { measurement } from "../../db/schema"
import { db } from "../../db"
import { measurementSchema } from "@/app/lib/shared/schemas/measuremen"
import { userServise } from "./user"
import { DEFAULT_TTL, InvalidateCached, ServeCached } from "../../redis"
import z from "zod/v4"


export const measurementRouter = new Elysia({
  prefix: "/measurement"
})
.use(userServise)

.get("/", async () => {
  return await db.query.measurement.findMany({
    orderBy: (measurement, { desc }) => [desc(measurement.createdAt)]
  })
})


.post("/", async ({body}) => {
  console.log(body)
  const result = await db.insert(measurement).values(body).returning();
  // await InvalidateCached(["admin", "measurements"]);
  // return result;
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
.put("/:id", async ({ params, body }) => {
  await db.update(measurement).set(body).where(eq(measurement.id, params.id)).returning()
  // await InvalidateCached(["admin", "measurements"])
}, {
  params: z.object({
    id: z.string()
  }),
  body: measurementSchema,
  whichRole: "admin"
})
.put("/status/:id", async ({ params, body}) => {
  await db.update(measurement).set({
    status: body.status
  }).where(eq(measurement.id, params.id))
}, {
  whichRole: "admin",
  body: z.object({
    status: z.enum(["PROCESSING", "COMPLETED"])
  })
})

.delete("/:id", async ({ params }) => {
  await db.delete(measurement).where(eq(measurement.id, params.id))
  await InvalidateCached(["admin", "measurements"])
  return { success: true }
}, {
  params: z.object({
    id: z.string()
  }),
  whichRole: "admin"
})