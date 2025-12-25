"use client";
import { useForm } from "react-hook-form";
import { unknown, z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	Form as ShadcnForm,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";
import { api } from "@/app/server/api";

const measurementSchema = z.object({
	name: z.string().min(2, "Имя слишком короткое"),
	phone: z.string().min(11, "Номер телефона должен содержать минимум 11 цифр"),
	email: z.email("Введите корректный email"),
	consent: z.boolean().refine((val) => val === true, {
		message: "Необходимо согласие на обработку данных",
	}),
});

type FormData = z.infer<typeof measurementSchema>;

export default function MeasurementForm() {
	const queryClient = useQueryClient();

	const form = useForm<FormData>({
		resolver: zodResolver(measurementSchema),
		defaultValues: {},
	});

	const submitMutation = useMutation({
		mutationFn: async (data: FormData) => {
			const requestData = {
				...data,
				status: "processing" as const,
			};

			console.log("Отправляю данные:", requestData);

			const result = await api.measurement.post(requestData);
			if (result.error) {
				throw Error("error");
			}
			return result.data;
		},
		onSuccess: () => {
			form.reset();
			alert("Форма успешно отправлена!");
			queryClient.invalidateQueries({ queryKey: ["forms"] });
		},
		onError: (error) => {
			alert("Что-то пошло не так");
		},
	});

	const onSubmit = (data: FormData) => {
		submitMutation.mutate(data);
	};

	const formatPhone = (value: string): string => {
		let cleaned = value.replace(/\D/g, "");
		if (cleaned.length > 11) cleaned = cleaned.substring(0, 11);

		if (cleaned.length === 0) return "";
		if (cleaned.length <= 3) return cleaned;
		if (cleaned.length <= 6)
			return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
		if (cleaned.length <= 8)
			return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;

		return `${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9)}`;
	};

	return (
		<div className="w-full px-10 flex flex-col gap-5 md:-mt-4">
			<h1 className="text-xl font-bold text-center">Вызвать замерщика</h1>

			<ShadcnForm {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder="Представьтесь пожалуйста"
										{...field}
										className="h-11 pl-4 bg-[#E2E2E2] placeholder:text-[#424268] placeholder:text-[16.5px]"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder="Номер телефона"
										{...field}
										onChange={(e) => {
											const formatted = formatPhone(e.target.value);
											field.onChange(formatted);
										}}
										value={field.value}
										className="h-11 pl-4 bg-[#E2E2E2] placeholder:text-[#424268] placeholder:text-[16.5px]"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type="email"
										placeholder="Email"
										{...field}
										className="h-11 px-4 bg-[#E2E2E2] placeholder:text-[#424268] placeholder:text-[16.5px]"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="consent"
						render={({ field }) => (
							<FormItem className="flex flex-col gap-2">
								<div className="flex flex-row gap-4 items-center justify-center">
									<FormControl>
										<Checkbox
											id="toggle-2"
											checked={field.value ?? false}
											onCheckedChange={(checked) => field.onChange(checked)}
											defaultChecked
											className="data-[state=checked]:border-blue-60 w-h h-4 aspect-square data-[state=checked]:bg-black data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel className="text-[12px] font-normal">
											Согласен на обработку персональных данных в соответствии с{" "}
											<a href="/" className="text-blue-600" target="_blank">
												политикой конфиденциальности
											</a>
										</FormLabel>
									</div>
								</div>
								<FormMessage className="text-[12px] text-center" />
							</FormItem>
						)}
					/>

					<div className="flex justify-center">
						<Button
							type="submit"
							className="bg-orange-500 py-5 px-10 w-[200px] text-white items-center text-sm hover:bg-orange-600 transition-colors"
							disabled={submitMutation.isPending}
						>
							{submitMutation.isPending ? "Отправка..." : "Отправить заявку"}
						</Button>
					</div>
				</form>
			</ShadcnForm>
		</div>
	);
}