"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	Form as ShadcnForm,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Button } from "@/app/components/ui/button";
import { api } from "@/app/lib/client/api";
import Image from "next/image";
import Price from "@/public/Price.svg"; 
import { X } from "lucide-react";
import { toast } from "sonner";

const questionsSchema = z.object({
	name: z.string().min(2, "Имя слишком короткое"),
	email: z.email("Введите корректный email"),
	message: z.string().min(10, "Сообщение должно содержать минимум 10 символов"),
	consent: z.boolean().refine((val) => val === true, {
		message: "Необходимо согласие на обработку данных",
	}),
});

type QuestionsFormData = z.infer<typeof questionsSchema>;

interface ApiErrorResponse {
	response?: {
		status: number;
		data?: {
			errors?: Record<string, string[]>;
			message?: string;
		};
	};
	message: string;
}

interface QuestionsModalFormProps {
	className?: string;
	buttonText?: string;
	textClassName?: string;
	icon?: React.ReactNode;
}

export default function QuestionsModalForm({
	className = "",
	buttonText = "Задать вопрос",
	textClassName = "",
	icon,
}: QuestionsModalFormProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm<QuestionsFormData>({
		resolver: zodResolver(questionsSchema),
		defaultValues: {
			name: "",
			email: "",
			message: "",
			consent: false,
		},
	});

	const submitMutation = useMutation({
		mutationFn: async (data: QuestionsFormData) => {

			const requestData = {
				name: data.name.trim(),
				email: data.email.trim(),
				message: data.message.trim(),
				consent: data.consent,
				status: "PROCESSING" as const,
			};

			console.log("Отправка данных:", requestData);

			try {
				const result = await api.questions.post(requestData);
				return result.data;
			} catch (error) {
				const apiError = error as ApiErrorResponse;
				console.error("Ошибка сервера:", {
					status: apiError.response?.status,
					data: apiError.response?.data,
					message: apiError.message
				});
				throw error;
			}
		},
		onSuccess: () => {
			form.reset();
			toast.success("Ваш вопрос успешно отправлен!");
			setIsModalOpen(false);
		
		},
		onError: (error: unknown) => {
			console.error("Ошибка отправки:", error);
			
			const isApiError = (err: unknown): err is ApiErrorResponse => {
				return typeof err === 'object' && err !== null && 'response' in err;
			};
			
			if (isApiError(error)) {
				if (error.response?.status === 422) {
					const serverErrors = error.response.data?.errors;
					if (serverErrors) {
						const errorMessages = Object.entries(serverErrors)
							.map(([field, messages]) => `${field}: ${messages.join(", ")}`)
							.join('\n');
						toast.error(`Ошибки валидации:\n${errorMessages}`);
					} else {
						toast.error("Ошибка валидации данных. Проверьте все поля и попробуйте еще раз.");
					}
				} else {
					toast.error(`Ошибка отправки: ${error.message || "Неизвестная ошибка"}`);
				}
			} else {
				toast.error("Неизвестная ошибка");
			}
		},
	});

	const onSubmit = (data: QuestionsFormData) => {
		console.log("Данные формы вопросов:", data);
		submitMutation.mutate(data);
	};

	return (
		<>
			<div
				className={`
                bg-[#2F2F51] rounded-sm cursor-pointer hover:bg-[#444479] transition-colors 
                ${className}`}
				onClick={() => setIsModalOpen(true)}
			>
				<div className="flex items-center gap-3 pl-3.5 py-3 pr-4">
					{icon || (
						<Image 
							src={Price || "/placeholder-question.svg"} 
							alt="Price" 
							width={20} 
							height={20} 
						/>
					)}
					<p
						className={`text-white font-bold ${textClassName || "text-[13px]"}`}
					>
						{buttonText}
					</p>
				</div>
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-[#2F2F51] rounded-xl shadow-xl w-full max-w-[90%] md:max-w-[600px] mx-auto max-h-[90vh] overflow-y-auto">
						<div className="relative pt-7 px-6 md:px-16">
							<button
								onClick={() => setIsModalOpen(false)}
								className="absolute right-4 top-4 text-white hover:text-gray-200"
							>
								<X className="md:w-10 md:h-10 w-7 h-7" strokeWidth={1.5} />
							</button>
						</div>

						<div className="px-9 md:px-14 py-8 flex flex-col justify-center items-center gap-7">
							<div className="flex items-center justify-center gap-4">
								<Image
									src={Price || "/placeholder-question.svg"}
									alt="Price"
									width={30}
									height={25}
								/>
								<h2 className="md:text-2xl text-xl font-bold text-white text-center">
									Задать вопрос
								</h2>
							</div>

							<ShadcnForm {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="flex flex-col gap-6 w-full"
								>
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														placeholder="Ваше имя"
														{...field}
														className="h-12 pl-4 bg-gray-100 placeholder:text-[#424268] placeholder:text-[17px]"
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
														placeholder="E-mail"
														{...field}
														className="h-12 pl-4 bg-gray-100 placeholder:text-[#424268] placeholder:text-[17px]"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="message"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Textarea
														placeholder="Ваш вопрос или сообщение"
														{...field}
														className="min-h-[120px] pl-4 pt-3 bg-gray-100 placeholder:text-[#424268] placeholder:text-[17px]"
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
												<div className="flex flex-row items-start gap-3">
													<FormControl>
													<Checkbox
														id="toggle-2"
														checked={field.value}
														onCheckedChange={(checked) => 
															field.onChange(checked === true)
														}
														className="data-[state=checked]:border-blue-60 w-h h-4 aspect-square data-[state=checked]:bg-orange-500 data-[state=checked]:text-orange-500 dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
													/>
													</FormControl>
													<div className="space-y-1 leading-none">
														<FormLabel className="text-sm font-normal text-white">
															Я согласен(на) на обработку{" "}
															<a
																href="/privacy-policy"
																className="text-orange-500"
																target="_blank"
																rel="noopener noreferrer"
															>
																персональных данных
															</a>
														</FormLabel>
													</div>
												</div>
												<FormMessage className="text-sm text-center text-white" />
											</FormItem>
										)}
									/>

									<div className="flex justify-center mt-4">
										<Button
											type="submit"
											className="bg-white hover:bg-gray-200 py-6 px-12 text-[#2F2F51] font-bold text-base transition-colors w-full md:w-auto"
											disabled={submitMutation.isPending}
										>
											{submitMutation.isPending
												? "Отправка..."
												: "Отправить вопрос"}
										</Button>
									</div>
								</form>
							</ShadcnForm>
						</div>
					</div>
				</div>
			)}
		</>
	);
}