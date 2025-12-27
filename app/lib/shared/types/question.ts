import { api } from "@/app/server/api";
import { InferTreatyReturnType } from "./utils";

export type Question = InferTreatyReturnType<typeof api.questions.get>[number]
