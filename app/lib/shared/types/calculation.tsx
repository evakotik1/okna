import { api } from "@/app/server/api";
import { InferTreatyReturnType } from "./utils";

export type Calculation = InferTreatyReturnType<typeof api.calculation.get>[number]

// // @/app/lib/shared/types/calculations.ts
// import { api } from "@/app/server/api";
// import { InferTreatyReturnType } from "./utils";

// // Автоматический тип из API
// export type Calculation = InferTreatyReturnType<typeof api.calculation.get>[number];

// // Кастомный тип для формы (без null/undefined)
// export type CalculationFormData = {
//   name: string;
//   phone: string;
//   email: string;
//   consent: boolean; 
//   status?: "PROCESSING" | "COMPLETED";
// };