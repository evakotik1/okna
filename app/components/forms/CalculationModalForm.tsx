"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
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
import { Checkbox } from "@/app/components/ui/checkbox";
import { Button } from "@/app/components/ui/button";
import { api } from "@/app/lib/client/api";
import Image from "next/image";
import Calculation from "@/public/calculation.svg";
import { X } from "lucide-react";

const calculationSchema = z.object({
	name: z.string().min(2, "Имя слишком короткое"),
	phone: z.string().min(11, "Номер телефона должен содержать минимум 11 цифр"),
	email: z.email("Введите корректный email"),
	consent: z.boolean().refine((val) => val === true, {
		message: "Необходимо согласие на обработку данных",
	}),
});

type FormData = z.infer<typeof calculationSchema>;

interface CalculationModalFormProps {
	className?: string;
	buttonText?: string;
	textClassName?: string;
}

export default function CalculationModalForm({
	className = "",
	buttonText = "Заказать расчет",
	textClassName = "",
}: CalculationModalFormProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm<FormData>({
		resolver: zodResolver(calculationSchema),
		defaultValues: {
			name: "",
			phone: "",
			email: "",
			consent: false,
		},
	});

	const submitMutation = useMutation({
		mutationFn: async (data: FormData) => {
			const requestData = {
				...data,
				status: "processing" as const,
			};

			console.log("Отправляю данные:", requestData);

			const result = await api.calculation.post(requestData);
			// if(result.error){
			//     throw Error("error")
			// }
			return result.data;
		},

		onSuccess: () => {
			form.reset();
			alert("Заявка на расчет успешно отправлена!");
			setIsModalOpen(false);
			queryClient.invalidateQueries({ queryKey: ["calculations"] });
		},
		onError: (error) => {
			console.error("Ошибка отправки:", error);
			alert(`Ошибка отправки: ${error.message || "Неизвестная ошибка"}`);
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
		<>
			<div
				className={`
                bg-[#2F2F51] rounded-sm cursor-pointer hover:bg-[#444479] transition-colors 
                ${className} `}
				onClick={() => setIsModalOpen(true)}
			>
				<div className="flex items-center gap-3 pl-3.5 py-3 pr-4 ">
					<Image src={Calculation} alt="Calculation" width={20} height={20} />
					<p
						className={`text-white font-bold ${textClassName || "text-[13px]"}`}
					>
						{buttonText}
					</p>
				</div>
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-[#2F2F51] rounded-xl shadow-xl w-full max-w-[90%] md:max-w-[600px] mx-auto">
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
									src={Calculation}
									alt="Calculation"
									width={30}
									height={25}
								/>
								<h2 className="md:text-2xl text-xl font-bold text-white text-center">
									Заказать расчет стоимости
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
										name="consent"
										render={({ field }) => (
											<FormItem className="flex flex-col gap-2">
												<div className="flex flex-row items-start gap-3">
													<FormControl>
														<Checkbox
															checked={field.value}
															onCheckedChange={(checked) => {
																field.onChange(checked);
															}}
															className="bg-white 
                                                        data-[state=checked]:bg-white 
                                                        data-[state=checked]:text-black"
														/>
													</FormControl>
													<div className="space-y-1 leading-none">
														<FormLabel className="text-sm font-normal text-white">
															Я согласен(на) на обработку{" "}
															<a
																href="/"
																className="text-orange-500"
																target="_blank"
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
											className="bg-white hover:bg-gray-200 py-3.5 px-12 text-[#2F2F51] font-bold text-base transition-colors w-full md:w-auto"
											disabled={submitMutation.isPending}
										>
											{submitMutation.isPending
												? "Отправка..."
												: "Заказать расчет"}
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
