import { z } from "zod";

export const serviceSchema = z.object({
    name: z.string().min(1, "Название обязательно"),
    description: z.string().min(1, "Описание обязательно"),
    file: z.string().min(1, "Изображение обязательно"),
});