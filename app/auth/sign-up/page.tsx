// "use client";

// import { authClient } from "@/app/lib/client/auth-client";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import z from "zod/v4";

// export default function SignUp() {
// 	const formSchema = z.object({
// 		name: z.string().min(2, "Имя слишком короткое"),
// 		email: z.email("Введите корректный email"),
// 		phone: z.string().min(11, "Номер телефона должен содержать минимум 11 цифр"),
// 		password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
// 	});

// 	const form = useForm({
// 		resolver: zodResolver(formSchema),
// 		defaultValues: {
// 			name: "",
// 			email: "",
// 			phone: "",
// 			password: "",
// 		} as z.infer<typeof formSchema>,
// 	});

// 	const onFormSubmit = async (data: z.infer<typeof formSchema>) => {
// 		await authClient.signUp.email(data, {
// 			onSuccess: () => {
// 				toast("Успешно!");
// 				window.location.href = "/";
// 			},
// 			onError: () => {
// 				toast("Ошибка!");
// 			},
// 		});
// 	};
// 	return (
// 		<div className="w-screen h-screen flex items-center justify-center bg-white">
// 			<div className=" w-sm aspect-square bg-black/30 rounded-sm p-4">
// 				<h1 className="text-xl font-bold text-center mb-4">Регистрация</h1>
// 				<form
// 					onSubmit={form.handleSubmit(onFormSubmit)}
// 					className="flex flex-col gap-4"
// 				>
// 					<input
// 						{...form.register("name")}
// 						placeholder="Name"
// 						className="h-12 bg-neutral-200 border-neutral-500 rounded-md placeholder:text-zinc-500 px-4 text-black"
// 					/>
// 					{form.formState.errors.name && (
// 						<p className="text-red-500 text-sm -mt-2">{form.formState.errors.name.message}</p>
// 					)}
// 					<input
// 						type="email"
// 						{...form.register("email")}
// 						placeholder="Email"
// 						className="h-12 bg-neutral-200 border-neutral-500 rounded-md placeholder:text-zinc-500 px-4 text-black"
// 					/>
// 					{form.formState.errors.name && (
// 						<p className="text-red-500 text-sm -mt-2">{form.formState.errors.name.message}</p>
// 					)}
// 					<input
// 						type="tel"
// 						{...form.register("phone")}
// 						placeholder="phone"
// 						className="h-12 bg-neutral-200 border-neutral-500 rounded-md placeholder:text-zinc-500 px-4 text-black"
// 					/>
// 					{form.formState.errors.name && (
// 						<p className="text-red-500 text-sm -mt-2">{form.formState.errors.name.message}</p>
// 					)}
// 					<input
// 						type="password"
// 						{...form.register("password")}
// 						placeholder="Password"
// 						className="h-12 bg-neutral-200 border-neutral-500 rounded-md placeholder:text-zinc-500 px-4 text-black"
// 					/>
// 					{form.formState.errors.name && (
// 						<p className="text-red-500 text-sm -mt-2">{form.formState.errors.name.message}</p>
// 					)}
// 					<button type="submit" className="text-xl font-bold text-center">
// 						Зарегистрироваться
// 					</button>
// 					<a href="/auth/sign-in" className="text-blue-600 hover:underline">Войти</a>
// 				</form>
// 			</div>
// 		</div>
// 	);
// }


"use client";

import { authClient } from "@/app/lib/client/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod/v4";
import { useState, useEffect } from "react";

export default function SignUp() {

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

	const formSchema = z.object({
		name: z.string().min(2, "Имя слишком короткое"),
		email: z.string().email("Введите корректный email"),
		phone: z.string()
			.min(11, "Номер телефона должен содержать минимум 11 цифр")
			.regex(/^[\d\s\(\)-]+$/, "Только цифры разрешены"),
		password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
	});

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			password: "",
		} as z.infer<typeof formSchema>,
	});

	const onFormSubmit = async (data: z.infer<typeof formSchema>) => {

		const phoneWithoutFormatting = data.phone.replace(/\D/g, "");
		const dataToSend = { ...data, phone: phoneWithoutFormatting };
		
		await authClient.signUp.email(dataToSend, {
			onSuccess: () => {
				toast.success("Регистрация успешна!");
				window.location.href = "/";
			},
			onError: () => {
				toast.error("Ошибка при регистрации");
			},
		});
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 p-4 md:p-8">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-orange-200 md:rounded-3xl">

				<div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 md:p-8 text-center">
					<h1 className="text-2xl md:text-3xl font-bold text-white">Регистрация</h1>
				</div>

				<form
					onSubmit={form.handleSubmit(onFormSubmit)}
					className="p-6 md:p-8 flex flex-col gap-4 md:gap-6"
				>
					<div className="flex flex-col gap-4 md:gap-6">
						<div>
							<label className="block text-sm font-medium mb-1 md:mb-2">
								Имя
							</label>
							<input
								{...form.register("name")}
								placeholder="Введите ваше имя"
								className="w-full h-12 md:h-14 placeholder:text-gray-600 bg-orange-50 border-2 border-orange-200 rounded-xl px-4 text-black text-base md:text-lg"
							/>
							{form.formState.errors.name && (
								<p className="text-red-500 text-xs md:text-sm mt-1 ml-1">{form.formState.errors.name.message}</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium mb-1 md:mb-2">
								Email
							</label>
							<input
								type="email"
								{...form.register("email")}
								placeholder="example@email.com"
								className="w-full placeholder:text-gray-600 h-12 md:h-14  bg-orange-50 border-2 border-orange-200 rounded-xl px-4 text-black text-base md:text-lg"
							/>
							{form.formState.errors.email && (
								<p className="text-red-500 text-xs md:text-sm mt-1 ml-1">{form.formState.errors.email.message}</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium mb-1 md:mb-2">
								Телефон
							</label>
							<input
								type="tel"
								{...form.register("phone")}
								placeholder="+7 (999) 999-99-99"
								value={form.watch("phone")}
								onChange={(e) => {
									const formatted = formatPhone(e.target.value);
									form.setValue("phone", formatted, { shouldValidate: true });
								}}
								onKeyDown={(e) => {
									if (
										!/[\d\s\(\)-]/.test(e.key) && 
										!["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)
									) {
										e.preventDefault();
									}
								}}
								className="w-full h-12 md:h-14 placeholder:text-gray-600 bg-orange-50 border-2 border-orange-200 rounded-xl px-4 text-black text-base md:text-lg"
							/>
							{form.formState.errors.phone && (
								<p className="text-red-500 text-xs md:text-sm mt-1 ml-1">{form.formState.errors.phone.message}</p>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium mb-1 md:mb-2">
								Пароль
							</label>
							<input
								type="password"
								{...form.register("password")}
								placeholder="Не менее 8 символов"
								className="w-full h-12 md:h-14 placeholder:text-gray-600 bg-orange-50 border-2 border-orange-200 rounded-xl px-4  text-base md:text-lg"
							/>
							{form.formState.errors.password && (
								<p className="text-red-500 text-xs md:text-sm mt-1 ml-1">{form.formState.errors.password.message}</p>
							)}
						</div>
					</div>

					<button
						type="submit"
						className="w-full h-12 md:h-14 bg-orange-500 text-white font-bold text-base md:text-lg rounded-xl hover:bg-orange-600 duration-200  mt-4 md:mt-6"
					>
						Зарегистрироваться
					</button>

					<div className="text-center mt-4 md:mt-6 pt-4 md:pt-6 border-t border-orange-100">
						<p className="text-gray-600 text-sm md:text-base">
							Уже есть аккаунт?{" "}
							<a
								href="/auth/sign-in"
								className="text-orange-500 font-semibold hover:text-orange-600 hover:underline transition-colors"
							>
								Войти
							</a>
						</p>
					</div>
				</form>



			</div>
		</div>
	);
}