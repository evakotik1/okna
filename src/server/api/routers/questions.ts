import { eq } from "drizzle-orm"
import Elysia from "elysia"
import z from "zod"
import { questions } from "../../db/schema"
import { db } from "../../db"
import { userServise } from "./user"
import { DEFAULT_TTL, InvalidateCached, ServeCached } from "../../redis"
import { questionsSchema } from "@/src/lib/shared/schemas/questions"


export const questionsRouter = new Elysia({
  prefix: "/questions"
})
.use(userServise)


.post("/", async ({body}) => {
  const result = await db.insert(questions).values(body).returning();
  await InvalidateCached(["admin", "questions"]);
  return result;
}, {
  body: questionsSchema
})








.get("/admin", async () => {
  return await ServeCached(["admin", "questions"], DEFAULT_TTL, async () => 
      await db.query.questions.findMany()
  )
}, {
  whichRole: "admin"
})

.post("/admin", async ({ body }) => {
  const result = await db.insert(questions).values(body).returning()
  await InvalidateCached(["admin", "questions"])
  return result
}, {
  body: questionsSchema,
  whichRole: "admin"
})

.put("/admin/:id", async ({ params, body }) => {
  const result = await db.update(questions).set(body).where(eq(questions.id, params.id)).returning()
  await InvalidateCached(["admin", "questions"])
  return result;
}, {
  params: z.object({
    id: z.string() 
  }),
  body: questionsSchema,
  whichRole: "admin"
})

.delete("/admin/:id", async ({ params }) => {
  await db.delete(questions).where(eq(questions.id, params.id))
  await InvalidateCached(["admin", "questions"])
  return { success: true }
}, {
  params: z.object({ 
    id: z.string() 
  }),
  whichRole: "admin"
})