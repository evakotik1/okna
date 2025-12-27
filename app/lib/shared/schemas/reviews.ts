import { z } from "zod/v4"

const statuses = z.enum({
	PROCESSING: "PROCESSING",
	COMPLETED: "COMPLETED",
});

export const reviewsSchema = z.object({
    name: z.string().min(2, "Имя слишком короткое"),
    contractNumber: z.string().min(1, "Номер договора обязателен"),
    email: z.email("Введите корректный email"),
    review: z.string().min(4, "Отзыв должен содержать минимум 4 символа"),
    consent: z.boolean(),
    status: statuses.optional(),
});