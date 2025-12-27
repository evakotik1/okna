import { z } from "zod/v4"

const statuses = z.enum({
	PROCESSING: "PROCESSING",
	COMPLETED: "COMPLETED",
});

export const questionsSchema = z.object({
    name: z.string().min(2, "Имя слишком короткое"),
    email: z.email("Введите корректный email"),
    message: z.string().min(4, "Сообщение должно содержать минимум 4 символа"),
    consent: z.boolean(),
    status: statuses.optional(),
})