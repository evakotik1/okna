import { z } from "zod/v4"

const statuses = z.enum({
	PROCESSING: "PROCESSING",
	COMPLETED: "COMPLETED",
});

export const calculationSchema = z.object({
    name: z.string().min(2, "Имя слишком короткое"),
    phone: z.string().min(11, "Номер телефона должен содержать минимум 11 цифр"),
    email: z.email("Введите корректный email"),
    consent: z.boolean(),
    status: statuses.optional(),
});