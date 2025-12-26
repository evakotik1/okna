"use client";

import { authClient } from "@/app/lib/client/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod/v4";

export default function SignUp() {
	const formSchema = z.object({
		name: z.string().min(2, "Имя слишком короткое"),
		email: z.email("Введите корректный email"),
		phone: z.string().min(11, "Номер телефона должен содержать минимум 11 цифр"),
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
		await authClient.signUp.email(data, {
			onSuccess: () => {
				toast("Успешно!");
				window.location.href = "/";
			},
			onError: () => {
				toast("Ошибка!");
			},
		});
	};
	return (
		<div className="w-screen h-screen flex items-center justify-center bg-white">
			<div className=" w-sm aspect-square bg-black/30 rounded-sm p-4">
				<h1 className="text-xl font-bold text-center mb-4">Регистрация</h1>
				<form
					onSubmit={form.handleSubmit(onFormSubmit)}
					className="flex flex-col gap-4"
				>
					<input
						{...form.register("name")}
						placeholder="Name"
						className="h-12 bg-neutral-200 border-neutral-500 rounded-md placeholder:text-zinc-500 px-4 text-black"
					/>
					{form.formState.errors.name && (
						<p className="text-red-500 text-sm -mt-2">{form.formState.errors.name.message}</p>
					)}
					<input
						type="email"
						{...form.register("email")}
						placeholder="Email"
						className="h-12 bg-neutral-200 border-neutral-500 rounded-md placeholder:text-zinc-500 px-4 text-black"
					/>
					{form.formState.errors.name && (
						<p className="text-red-500 text-sm -mt-2">{form.formState.errors.name.message}</p>
					)}
					<input
						type="tel"
						{...form.register("phone")}
						placeholder="phone"
						className="h-12 bg-neutral-200 border-neutral-500 rounded-md placeholder:text-zinc-500 px-4 text-black"
					/>
					{form.formState.errors.name && (
						<p className="text-red-500 text-sm -mt-2">{form.formState.errors.name.message}</p>
					)}
					<input
						type="password"
						{...form.register("password")}
						placeholder="Password"
						className="h-12 bg-neutral-200 border-neutral-500 rounded-md placeholder:text-zinc-500 px-4 text-black"
					/>
					{form.formState.errors.name && (
						<p className="text-red-500 text-sm -mt-2">{form.formState.errors.name.message}</p>
					)}
					<button type="submit" className="text-xl font-bold text-center">
						Зарегистрироваться
					</button>
					<a href="/auth/sign-in" className="text-blue-600 hover:underline">Войти</a>
				</form>
			</div>
		</div>
	);
}
