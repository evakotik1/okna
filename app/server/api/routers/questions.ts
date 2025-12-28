import { eq } from "drizzle-orm"
import Elysia from "elysia"
import { db } from "../../db"
import { userServise } from "./user"
import { DEFAULT_TTL, InvalidateCached, ServeCached } from "../../redis"
import z from "zod/v4"
import { questions } from "../../db/schema"
import { questionsSchema } from "@/app/lib/shared/schemas/questions"


export const questionsRouter = new Elysia({
  prefix: "/questions"
})
.use(userServise)

.get("/", async () => {
  return await db.query.questions.findMany({
    orderBy: (questions, { desc }) => [desc(questions.createdAt)]
  })
})


.post("/", async ({body}) => {
  console.log(body)
  const result = await db.insert(questions).values(body).returning();
  console.log("💾 Saved to DB:", result);
  
  // await InvalidateCached(["admin", "questions"]);
  return result;
}, {
  body: questionsSchema
})



.get("/admin", async () => {
  return await ServeCached(["admin", "questionss"], DEFAULT_TTL, async () =>
      await db.query.questions.findMany()
  )
}, {
  whichRole: "admin"
})
.put("/:id", async ({ params, body }) => {
  await db.update(questions).set(body).where(eq(questions.id, params.id)).returning()
  // await InvalidateCached(["admin", "questionss"])
}, {
  params: z.object({
    id: z.string()
  }),
  body: questionsSchema,
  whichRole: "admin"
})
.put("/status/:id", async ({ params, body}) => {
  await db.update(questions).set({
    status: body.status
  }).where(eq(questions.id, params.id))
}, {
  whichRole: "admin",
  body: z.object({
    status: z.enum(["PROCESSING", "COMPLETED"])
  })
})

.delete("/:id", async ({ params }) => {
  await db.delete(questions).where(eq(questions.id, params.id))
  await InvalidateCached(["admin", "questionss"])
  return { success: true }
}, {
  params: z.object({
    id: z.string()
  }),
  whichRole: "admin"
})