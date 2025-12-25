"use client";

import { authClient } from "@/app/lib/client/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminLogin() {
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    
    const formSchema = z.object({
        email: z.email("Некорректный email"),
        password: z.string().min(1, "Введите пароль"),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onFormSubmit = async (data: z.infer<typeof formSchema>) => {
        setError("");
        setIsLoading(true);

        try {

            const result = await authClient.signIn.email({
                email: data.email,
                password: data.password,
            });

            if (result?.error) {
                setError("Неверный email или пароль");
                setIsLoading(false);
                return;
            }


            router.push("/admin");
            
        } catch (err) {
            setError("Произошла ошибка при входе");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">
                        Админ-панель
                    </h1>
                </div>

                <div className="bg-white rounded-xl shadow-xl p-8 ">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                        Вход для администратора
                    </h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm text-center">{error}</p>
                        </div>
                    )}

                    <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-5">
                        <div>
                            <input
                                {...form.register("email")}
                                type="email"
                                placeholder="email"
                                className="w-full h-12 px-4 rounded-lg border border-gray-300  "
                                disabled={isLoading}
                            />
                            {form.formState.errors.email && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.formState.errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <input
                                {...form.register("password")}
                                type="password"
                                placeholder="password"
                                className="w-full h-12 px-4 rounded-lg border border-gray-300 "
                                disabled={isLoading}
                            />
                            {form.formState.errors.password && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.formState.errors.password.message}
                                </p>
                            )}
                        </div>


                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition duration-300 flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                    Вход...
                                </>
                            ) : (
                                "Войти в админку"
                            )}
                        </button>
                    </form>

                </div>

            </div>
        </div>
    );
}