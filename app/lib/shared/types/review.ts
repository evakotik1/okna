import { api } from "@/app/server/api";
import { InferTreatyReturnType } from "./utils";

export type Reviews = InferTreatyReturnType<typeof api.reviews.get>[number]