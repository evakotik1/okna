import { z } from "zod/v4"

export const measurementSchema = z.object({
    name: z.string().min(2, "Имя слишком короткое"),
    phone: z.string().min(11, "Номер телефона должен содержать минимум 11 цифр"),
    email: z.email("Введите корректный email"),
    consent: z.boolean().default(false),
    status: z.enum(['processing', 'completed']).optional().default('processing'),
});