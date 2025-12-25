import { z } from "zod/v4"

export const reviewsSchema = z.object({
    name: z.string().min(2, "Имя слишком короткое"),
    contractNumber: z.string().min(1, "Номер договора обязателен"),
    email: z.email("Введите корректный email"),
    review: z.string().min(4, "Отзыв должен содержать минимум 4 символа"),
    consent: z.boolean().default(false),
    status: z.enum(['new', 'read']).optional().default('new'),
});