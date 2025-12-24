// import { eq, isNull } from "drizzle-orm";
// import Elysia from "elysia";
// import z from "zod/v4";
// import { userServise } from "./user";
// import { db } from "../../db";
// import { user } from "../../db/auth-schema";
// import { calculation, measurement, questions, reviews } from "../../db/schema";
// import { measurementSchema } from "@/src/lib/shared/schemas/measuremen";
// import { calculationSchema } from "@/src/lib/shared/schemas/calculation";
// import { reviewsSchema } from "@/src/lib/shared/schemas/reviews";
// import { questionsSchema } from "@/src/lib/shared/schemas/questions";
// import { DEFAULT_TTL, InvalidateCached, ServeCached } from "../../redis";

// export const adminRouter = new Elysia({
//     prefix: "/admin"
// })
// .use(userServise)

// .get("/users", async () => {
//     return await ServeCached(["admin", "user"], DEFAULT_TTL, async () => 
//         await db.query.user.findMany({
//             where: isNull(user.deletedAt)
//         })
//     )
// }, {
//     whichRole: "admin"
// })

// .get("/users/:id", async ({ params }) => {
//     return await ServeCached(["admin", "users", params.id], DEFAULT_TTL, async () => 
//         await db.query.user.findFirst({
//             where: eq(user.id, params.id)
//         })
//     );
// },  {
//     params: z.object({
//         id: z.string()
//     }),
//     whichRole: "admin"
// })



// .get("/measurements", async () => {
//     return await ServeCached(["admin", "measurements"], DEFAULT_TTL, async () => 
//         await db.query.measurement.findMany()
//     )
// }, {
//     whichRole: "admin"
// })

// .post("/measurements", async ({ body }) => {
//     const result = await db.insert(measurement).values(body).returning()
//     await InvalidateCached(["admin", "measurements"])
//     return result
// }, {
//     body: measurementSchema,
//     whichRole: "admin"
// })
  
  
// .put("/measurements/:id/", async ({ params, body }) => {
//     const result = await db.update(measurement).set(body).where(eq(measurement.id, params.id)).returning()
//     await InvalidateCached(["admin", "measurements"])
//     return result;
// }, {
//     params: z.object({
//         id: z.string(),
//     }),
//     body: measurementSchema,
//     whichRole: "admin"
// })
  
// .delete("/measurements/:id", async ({ params }) => {
//     await db.delete(measurement).where(eq(measurement.id, params.id));
//     await InvalidateCached(["admin", "measurements"])
// }, {
//     params: z.object({
//         id: z.string()
//     }),
//     whichRole: "admin"
// })




// .get("/calculations", async () => {
//   return await ServeCached(["admin", "calculations"], DEFAULT_TTL, async () => 
//       await db.query.calculation.findMany()
//   )
// }, {
//   whichRole: "admin"
// })

// .post("/calculations", async ({ body }) => {
//   const result = await db.insert(calculation).values(body).returning()
//   await InvalidateCached(["admin", "calculations"])
//   return result
// }, {
//   body: calculationSchema,
//   whichRole: "admin"
// })


// .put("/calculations/:id/", async ({ params, body }) => {
//   const result = await db.update(calculation).set(body).where(eq(calculation.id, params.id)).returning()
//   await InvalidateCached(["admin", "calculations"])
//   return result;
// }, {
//   params: z.object({
//       id: z.string(),
//   }),
//   body: calculationSchema,
//   whichRole: "admin"
// })

// .delete("/calculations/:id", async ({ params }) => {
//   await db.delete(calculation).where(eq(calculation.id, params.id));
//   await InvalidateCached(["admin", "calculations"])
// }, {
//   params: z.object({
//       id: z.string()
//   }),
//   whichRole: "admin"
// })




// .get("/reviews", async () => {
//   return await ServeCached(["admin", "reviews"], DEFAULT_TTL, async () => 
//       await db.query.reviews.findMany()
//   )
// }, {
//   whichRole: "admin"
// })

// .post("/reviews", async ({ body }) => {
//   const result = await db.insert(reviews).values(body).returning()
//   await InvalidateCached(["admin", "reviews"])
//   return result
// }, {
//   body: reviewsSchema,
//   whichRole: "admin"
// })


// .put("/reviews/:id/", async ({ params, body }) => {
//   const result = await db.update(reviews).set(body).where(eq(reviews.id, params.id)).returning()
//   await InvalidateCached(["admin", "reviews"])
//   return result;
// }, {
//   params: z.object({
//       id: z.string(),
//   }),
//   body: reviewsSchema,
//   whichRole: "admin"
// })

// .delete("/reviews/:id", async ({ params }) => {
//   await db.delete(reviews).where(eq(reviews.id, params.id));
//   await InvalidateCached(["admin", "reviews"])
// }, {
//   params: z.object({
//       id: z.string()
//   }),
//   whichRole: "admin"
// })





// .get("/questions", async () => {
//   return await ServeCached(["admin", "questions"], DEFAULT_TTL, async () => 
//       await db.query.questions.findMany()
//   )
// }, {
//   whichRole: "admin"
// })

// .post("/questions", async ({ body }) => {
//   const result = await db.insert(questions).values(body).returning()
//   await InvalidateCached(["admin", "questions"])
//   return result
// }, {
//   body: questionsSchema,
//   whichRole: "admin"
// })


// .put("/questions/:id/", async ({ params, body }) => {
//   const result = await db.update(questions).set(body).where(eq(questions.id, params.id)).returning()
//   await InvalidateCached(["admin", "questions"])
//   return result;
// }, {
//   params: z.object({
//       id: z.string(),
//   }),
//   body: questionsSchema,
//   whichRole: "admin"
// })

// .delete("/questions/:id", async ({ params }) => {
//   await db.delete(questions).where(eq(questions.id, params.id));
//   await InvalidateCached(["admin", "questions"])
// }, {
//   params: z.object({
//       id: z.string()
//   }),
//   whichRole: "admin"
// })