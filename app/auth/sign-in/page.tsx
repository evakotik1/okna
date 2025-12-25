"use client";

import { authClient } from "@/app/lib/client/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export default function SignIn() {
    const formSchema = z.object({
        name: z.string().min(2, "Имя слишком короткое"),
        email: z.email("Некорректный email"),
        phone: z.string().min(11, "Минимум 11 цифр"),
        password: z.string().min(8, "Минимум 8 символов"),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
        },
    });

    const onFormSubmit = async (data: z.infer<typeof formSchema>) => {
    await authClient.signIn.email(data, {
        onSuccess: () => {
            alert("Успешно!");
            window.location.href = "/";
        },
        onError: () => {
            alert("Ошибка!");
        },
    });
};

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-white">
            <div className="w-sm aspect-square bg-black/30 rounded-sm p-4">
                <h1 className="text-xl font-bold text-center mb-4">Вход</h1>
                <form onSubmit={form.handleSubmit(onFormSubmit)} className="flex flex-col gap-4">

                    <input
                        {...form.register("name")}
                        placeholder="Имя"
                        className="h-12 bg-neutral-200 border-neutral-500 rounded-md placeholder:text-zinc-500 px-4 text-black"
                    />
                    {form.formState.errors.name && (
                        <p className="text-red-500 text-sm -mt-2">{form.formState.errors.name.message}</p>
                    )}
                    
                    <input
                        {...form.register("email")}
                        placeholder="Email"
                        type="email"
                        className="h-12 bg-neutral-200 border-neutral-500 rounded-md placeholder:text-zinc-500 px-4 text-black"
                    />
                    {form.formState.errors.email && (
                        <p className="text-red-500 text-sm -mt-2">{form.formState.errors.email.message}</p>
                    )}
                    
                    <input
                        {...form.register("phone")}
                        placeholder="Телефон"
                        className="h-12 bg-neutral-200 border-neutral-500 rounded-md placeholder:text-zinc-500 px-4 text-black"
                    />
                    {form.formState.errors.phone && (
                        <p className="text-red-500 text-sm -mt-2">{form.formState.errors.phone.message}</p>
                    )}
                    
                    <input
                        {...form.register("password")}
                        placeholder="Пароль"
                        type="password"
                        className="h-12 bg-neutral-200 border-neutral-500 rounded-md placeholder:text-zinc-500 px-4 text-black"
                    />
                    {form.formState.errors.password && (
                        <p className="text-red-500 text-sm -mt-2">{form.formState.errors.password.message}</p>
                    )}
                    
                    <button type="submit" className="h-12 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700">
                        Войти
                    </button>
                </form>
                <div className="flex flex-col items-center justify-center mt-4">
                    <p className="text-neutral-500">Нет аккаунта?</p>
                    <a href="/auth/sign-up" className="text-blue-600 hover:underline">Зарегистрироваться</a>
                </div>
            </div>
        </div>
    );
}