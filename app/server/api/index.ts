import Elysia from "elysia";
import { treaty } from "@elysiajs/eden";
import { measurementRouter } from "./routers/measurement"
import { calculationRouter } from "./routers/calculation"
import { questionsRouter } from "./routers/questions"
// import { adminRouter } from "./routers/admin"
import { userRouter } from "./routers/user";
import { productsRouter } from "./routers/products"
import { servicesRouter } from "./routers/services";
import { fileRouter } from "./routers/file";
import { reviewsRouter } from "./routers/reviews";


export const app = new Elysia({
    prefix: "/api"
})

.use(measurementRouter)
.use(calculationRouter)
.use(reviewsRouter)
.use(questionsRouter)
// .use(adminRouter)
.use(userRouter)
.use(productsRouter)
.use(servicesRouter)
.use(fileRouter)

export type App = typeof app;
export const api = treaty(app).api;