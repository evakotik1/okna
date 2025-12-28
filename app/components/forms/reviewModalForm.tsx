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
import { Textarea } from "@/app/components/ui/textarea";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Button } from "@/app/components/ui/button";
import { api } from "@/app/lib/client/api";
import Image from "next/image";
import { X } from "lucide-react";
import { toast } from "sonner";

const reviewSchema = z.object({
	name: z.string().min(2, "Имя слишком короткое"),
	contractNumber: z.string().min(1, "Укажите номер договора"),
	email: z.email("Введите корректный email"),
	review: z.string().min(10, "Отзыв должен содержать минимум 10 символов"),
	consent: z.boolean().refine((val) => val === true, {
		message: "Необходимо согласие на обработку данных",
	}),
});

type FormData = z.infer<typeof reviewSchema>;

export default function ReviewModalForm() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const queryClient = useQueryClient();

	const form = useForm<FormData>({
		resolver: zodResolver(reviewSchema),
		defaultValues: {
			name: "",
			contractNumber: "",
			email: "",
			review: "",
			consent: false,
		},
	});

	const submitMutation = useMutation({
		mutationFn: async (data: FormData) => {
			const requestData = {
				...data,
			  };
		  
			  await api.reviews.post(requestData);
		  // ...
		},
		
		onSuccess: () => {
			form.reset();
			toast("Ваш отзыв успешно отправлен!");
			setIsModalOpen(false);
			queryClient.invalidateQueries({ queryKey: ["reviews"] });
		},
		onError: (error) => {
			toast("Что-то пошло не так");
		},
	});

	const onSubmit = (data: FormData) => {
		submitMutation.mutate(data);
	};

	return (
		<>
			<button
				onClick={() => setIsModalOpen(true)}
				className="hover:bg-orange-600 flex items-center justify-center gap-4 px-8 py-2 md:py-4 bg-orange-500 text-white rounded-sm w-full md:w-auto mt-4 md:mt-0 "
			>
				<Image src="/addReview.svg" alt="addReview" width={25} height={25} />
				<p className="text-sm md:text-base font-bold">Оставить отзыв</p>
			</button>

			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white rounded-xl shadow-xl w-full max-w-[90%] md:max-w-[550px] mx-auto">
						<div className="relative pt-7 px-6 md:px-16">
							<button
								onClick={() => setIsModalOpen(false)}
								className="absolute right-5 top-5  hover:text-gray-700"
							>
								<Image
									src="/krestik.png"
									alt="Закрыть"
									width={7}
									height={7}
									className="w-5 h-5 md:w-6 md:h-6"
								/>
							</button>
						</div>

						<div className="px-9 md:px-20 py-8 flex flex-col justify-center items-center gap-7">
							<div className="flex items-center justify-center w-full relative">
								<div className="absolute left-0">
									<Image
										src="/addReview1.svg"
										alt="addReview"
										width={30}
										height={30}
									/>
								</div>

								<h2 className="md:text-2xl text-xl font-bold text-center flex-1">
									Добавьте Ваш отзыв
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
														className="h-12 pl-4 bg-[#E2E2E2] placeholder:text-[#424268] placeholder:text-[17px]"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="contractNumber"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														placeholder="Номер договора"
														{...field}
														className="h-12 pl-4 bg-[#E2E2E2] placeholder:text-[#424268] placeholder:text-[17px]"
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
														className="h-12 pl-4 bg-[#E2E2E2] placeholder:text-[#424268] placeholder:text-[17px]"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="review"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Textarea
														placeholder="Ваш отзыв"
														{...field}
														className="min-h-[120px] pl-4 pt-3 bg-[#E2E2E2] placeholder:text-[#424268] placeholder:text-[17px] resize-none"
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
												<div className="flex flex-row items-center gap-3">
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
														<FormLabel className="text-sm font-normal">
															Я согласен(на) на обработку{" "}
															<a
																href="/"
																className="text-[#2F2F51]"
																target="_blank"
															>
																персональных данных
															</a>
														</FormLabel>
													</div>
												</div>
												<FormMessage className=" text-sm text-center" />
											</FormItem>
										)}
									/>

									<div className="flex justify-center mt-4">
										<Button
											type="submit"
											className="bg-orange-500 hover:bg-orange-600 py-6 px-12 text-white font-bold text-base transition-colors w-full md:w-auto"
											disabled={submitMutation.isPending}
										>
											{submitMutation.isPending
												? "Отправка..."
												: "Оставить отзыв"}
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
