import { z } from "zod/v4"

export const questionsSchema = z.object({
    name: z.string().min(2, "Имя слишком короткое"),
    email: z.email("Введите корректный email"),
    message: z.string().min(4, "Сообщение должно содержать минимум 4 символа"),
    consent: z.boolean().default(false),
    status: z.enum(['new', 'read']).optional().default('new'),
})