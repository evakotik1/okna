// import { eq } from "drizzle-orm"
// import Elysia from "elysia"
// import z from "zod"
// import { calculation } from "../../db/schema"
// import { db } from "../../db"
// import { userServise } from "./user"
// import { DEFAULT_TTL, InvalidateCached, ServeCached } from "../../redis"
// import { calculationSchema } from "@/app/lib/shared/schemas/calculation"


// export const calculationRouter = new Elysia({
//   prefix: "/calculation"
// })
// .use(userServise)

// .get("/", async () => {
//   return await db.query.calculation.findMany({
//     orderBy: (calculation, { desc }) => [desc(calculation.createdAt)]
//   })
// })


// .post("/", async ({body}) => {
//   const result = await db.insert(calculation).values(body).returning();
//   // await InvalidateCached(["admin", "calculations"]);
//   return result;
// }, {
//   body: calculationSchema
// })








// .get("/admin", async () => {
//   return await ServeCached(["admin", "calculations"], DEFAULT_TTL, async () => 
//       await db.query.calculation.findMany()
//   )
// }, {
//   whichRole: "admin"
// })

// // .post("/admin", async ({ body }) => {
// //   const result = await db.insert(calculation).values(body).returning()
// //   await InvalidateCached(["admin", "calculations"])
// //   return result
// // }, {
// //   body: calculationSchema,
// //   whichRole: "admin"
// // })


// .put("/:id", async ({ params, body }) => {
//   await db.update(calculation).set(body).where(eq(calculation.id, params.id)).returning()
//   // await InvalidateCached(["admin", "calculations"])
// }, {
//   params: z.object({
//     id: z.string() 
//   }),
//   body: calculationSchema,
//   // whichRole: "admin"
// })
// .put("/status/:id", async ({ params, body}) => {
//   // await db.update(calculation).set({
//   //   status: body.status
//   // }).where(eq(calculation.id, params.id))
//   const result = await db.update(calculation)
//   .set({
//     status: body.status
//   })
//   .where(eq(calculation.id, params.id))
//   .returning()
// return result;
// }, {
//   whichRole: "admin",
//   body: z.object({
//     status: z.enum(["PROCESSING", "COMPLETED"])
//   })
// })

// .delete("/:id", async ({ params }) => {
//   await db.delete(calculation).where(eq(calculation.id, params.id))
//   // await InvalidateCached(["admin", "calculations"])
//   return { success: true }
// }, {
//   params: z.object({ 
//     id: z.string() 
//   }),
//   whichRole: "admin"
// })


import { eq } from "drizzle-orm"
import Elysia from "elysia"
import { db } from "../../db"
import { userServise } from "./user"
import { DEFAULT_TTL, InvalidateCached, ServeCached } from "../../redis"
import z from "zod/v4"
import { calculation } from "../../db/schema"
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
  console.log(body)
  const result = await db.insert(calculation).values(body).returning();
  // await InvalidateCached(["admin", "calculations"]);
  // return result;
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
.put("/:id", async ({ params, body }) => {
  await db.update(calculation).set(body).where(eq(calculation.id, params.id)).returning()
  // await InvalidateCached(["admin", "calculations"])
}, {
  params: z.object({
    id: z.string()
  }),
  body: calculationSchema,
  // whichRole: "admin"
})
.put("/status/:id", async ({ params, body}) => {
  await db.update(calculation).set({
    status: body.status
  }).where(eq(calculation.id, params.id))
}, {
  // whichRole: "admin",
  body: z.object({
    status: z.enum(["PROCESSING", "COMPLETED"])
  })
})

.delete("/:id", async ({ params }) => {
  await db.delete(calculation).where(eq(calculation.id, params.id))
  await InvalidateCached(["admin", "calculations"])
  return { success: true }
}, {
  params: z.object({
    id: z.string()
  }),
  // whichRole: "admin"
})