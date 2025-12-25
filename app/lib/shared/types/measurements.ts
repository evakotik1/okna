import { api } from "@/app/server/api";
import { InferTreatyReturnType } from "./utils";

export type Measurement = InferTreatyReturnType<typeof api.measurement.get>[number]