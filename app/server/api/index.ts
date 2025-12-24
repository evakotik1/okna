import Elysia from "elysia";
import { measurementRouter } from "./routers/measurement"
import { calculationRouter } from "./routers/calculation"
import { reviewsRouter } from "./routers/reviews"
import { questionsRouter } from "./routers/questions"
// import { adminRouter } from "./routers/admin"
import { userRouter } from "./routers/user";
import { productsRouter } from "./routers/products"
import { servicesRouter } from "./routers/services";
import { fileRouter } from "./routers/file";


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