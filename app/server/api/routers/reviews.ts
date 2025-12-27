// import { eq } from "drizzle-orm"
// import Elysia from "elysia"
// import z from "zod"
// import { reviews } from "../../db/schema"
// import { db } from "../../db"
// import { userServise } from "./user"
// import { DEFAULT_TTL, InvalidateCached, ServeCached } from "../../redis"
// import { reviewsSchema } from "@/app/lib/shared/schemas/reviews"


// export const reviewsRouter = new Elysia({
//   prefix: "/reviews"
// })
// .use(userServise)

// .get("/", async () => {
//   return await db.query.reviews.findMany({
//     orderBy: (reviews, { desc }) => [desc(reviews.createdAt)]
//   })
// })

// .post("/", async ({body}) => {
//   console.log(body)
//   const result = await db.insert(reviews).values(body).returning();
//   // await InvalidateCached(["admin", "reviews"]);
//   // return result;
// }, {
//   body: reviewsSchema
// })








// .get("/admin", async () => {
//   return await ServeCached(["admin", "reviews"], DEFAULT_TTL, async () => 
//       await db.query.reviews.findMany()
//   )
// }, {
//   whichRole: "admin"
// })

// .put("/:id", async ({ params, body }) => {
//   await db.update(reviews).set(body).where(eq(reviews.id, params.id)).returning()
//   // await InvalidateCached(["admin", "reviewss"])
// }, {
//   params: z.object({
//     id: z.string()
//   }),
//   body: reviewsSchema,
//   // whichRole: "admin"
// })

// .put("/status/:id", async ({ params, body}) => {
//   await db.update(reviews).set({
//     status: body.status
//   }).where(eq(reviews.id, params.id))
// }, {
//   // whichRole: "admin",
//   body: z.object({
//     status: z.enum(["PROCESSING", "COMPLETED"])
//   })
// })


// // .post("/admin", async ({ body }) => {
// //   const result = await db.insert(reviews).values(body).returning()
// //   await InvalidateCached(["admin", "reviews"])
// //   return result
// // }, {
// //   body: reviewsSchema,
// //   whichRole: "admin"
// // })

// // .put("/admin/:id", async ({ params, body }) => {
// //   const result = await db.update(reviews).set(body).where(eq(reviews.id, params.id)).returning()
// //   await InvalidateCached(["admin", "reviews"])
// //   return result;
// // }, {
// //   params: z.object({
// //     id: z.string() 
// //   }),
// //   body: reviewsSchema,
// //   whichRole: "admin"
// // })

// .delete("/:id", async ({ params }) => {
//   await db.delete(reviews).where(eq(reviews.id, params.id))
//   await InvalidateCached(["admin", "reviews"])
//   return { success: true }
// }, {
//   params: z.object({ 
//     id: z.string() 
//   }),
//   // whichRole: "admin"
// })



import { eq } from "drizzle-orm"
import Elysia from "elysia"
import { db } from "../../db"
import { userServise } from "./user"
import { DEFAULT_TTL, InvalidateCached, ServeCached } from "../../redis"
import z from "zod/v4"
import { reviews } from "../../db/schema"
import { reviewsSchema } from "@/app/lib/shared/schemas/reviews"


export const reviewsRouter = new Elysia({
  prefix: "/reviews"
})
.use(userServise)

.get("/", async () => {
  return await db.query.reviews.findMany({
    orderBy: (reviews, { desc }) => [desc(reviews.createdAt)]
  })
})


.post("/", async ({body}) => {
  console.log(body)
  const result = await db.insert(reviews).values(body).returning();
  console.log("💾 Saved to DB:", result);
  
  // await InvalidateCached(["admin", "reviews"]);
  return result;
}, {
  body: reviewsSchema
})



.get("/admin", async () => {
  return await ServeCached(["admin", "reviewss"], DEFAULT_TTL, async () =>
      await db.query.reviews.findMany()
  )
}, {
  whichRole: "admin"
})
.put("/:id", async ({ params, body }) => {
  await db.update(reviews).set(body).where(eq(reviews.id, params.id)).returning()
  // await InvalidateCached(["admin", "reviewss"])
}, {
  params: z.object({
    id: z.string()
  }),
  body: reviewsSchema,
  // whichRole: "admin"
})
.put("/status/:id", async ({ params, body}) => {
  await db.update(reviews).set({
    status: body.status
  }).where(eq(reviews.id, params.id))
}, {
  // whichRole: "admin",
  body: z.object({
    status: z.enum(["PROCESSING", "COMPLETED"])
  })
})

.delete("/:id", async ({ params }) => {
  await db.delete(reviews).where(eq(reviews.id, params.id))
  await InvalidateCached(["admin", "reviewss"])
  return { success: true }
}, {
  params: z.object({
    id: z.string()
  }),
  // whichRole: "admin"
})