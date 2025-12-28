// "use client";

// import { authClient } from "@/app/lib/client/auth-client";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import z from "zod";

// export default function SignIn() {
//     const formSchema = z.object({
//         name: z.string().min(2, "Имя слишком короткое"),
//         email: z.email("Некорректный email"),
//         phone: z.string().min(11, "Минимум 11 цифр"),
//         password: z.string().min(8, "Минимум 8 символов"),
//     });

//     const form = useForm({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             name: "",
//             email: "",
//             phone: "",
//             password: "",
//         },
//     });

//     const onFormSubmit = async (data: z.infer<typeof formSchema>) => {
//     await authClient.signIn.email(data, {
//         onSuccess: () => {
//             toast("Успешно!");
//             window.location.href = "/";
//         },
//         onError: () => {
//             toast("Ошибка!");
//         },
//     });
// };

//     return (
//         <div className="w-screen h-screen flex items-center justify-center bg-white">
//             <div className="w-sm aspect-square bg-black/30 rounded-sm p-4">
//                 <h1 className="text-xl font-bold text-center mb-4">Вход</h1>
//                 <form onSubmit={form.handleSubmit(onFormSubmit)} className="flex flex-col gap-4">

//                     <input
//                         {...form.register("name")}
//                         placeholder="Имя"
//                         className="h-12 bg-neutral-200 border-neutral-500 rounded-md placeholder:text-zinc-500 px-4 text-black"
//                     />
//                     {form.formState.errors.name && (
//                         <p className="text-red-500 text-sm -mt-2">{form.formState.errors.name.message}</p>
//                     )}
                    
//                     <input
//                         {...form.register("email")}
//                         placeholder="Email"
//                         type="email"
//                         className="h-12 bg-neutral-200 border-neutral-500 rounded-md placeholder:text-zinc-500 px-4 text-black"
//                     />
//                     {form.formState.errors.email && (
//                         <p className="text-red-500 text-sm -mt-2">{form.formState.errors.email.message}</p>
//                     )}
                    
//                     <input
//                         {...form.register("phone")}
//                         placeholder="Телефон"
//                         className="h-12 bg-neutral-200 border-neutral-500 rounded-md placeholder:text-zinc-500 px-4 text-black"
//                     />
//                     {form.formState.errors.phone && (
//                         <p className="text-red-500 text-sm -mt-2">{form.formState.errors.phone.message}</p>
//                     )}
                    
//                     <input
//                         {...form.register("password")}
//                         placeholder="Пароль"
//                         type="password"
//                         className="h-12 bg-neutral-200 border-neutral-500 rounded-md placeholder:text-zinc-500 px-4 text-black"
//                     />
//                     {form.formState.errors.password && (
//                         <p className="text-red-500 text-sm -mt-2">{form.formState.errors.password.message}</p>
//                     )}
                    
//                     <button type="submit" className="h-12 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700">
//                         Войти
//                     </button>
//                 </form>
//                 <div className="flex flex-col items-center justify-center mt-4">
//                     <p className="text-neutral-500">Нет аккаунта?</p>
//                     <a href="/auth/sign-up" className="text-blue-600 hover:underline">Зарегистрироваться</a>
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";

import { authClient } from "@/app/lib/client/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function SignIn() {
    const formSchema = z.object({
        email: z.string().email("Некорректный email"),
        password: z.string().min(8, "Минимум 8 символов"),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onFormSubmit = async (data: z.infer<typeof formSchema>) => {
        await authClient.signIn.email(data, {
            onSuccess: () => {
                toast.success("Вход успешен!");
                window.location.href = "/";
            },
            onError: () => {
                toast.error("Ошибка входа!");
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 p-4 md:p-8">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-orange-200 md:rounded-3xl">

                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 md:p-8 text-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">Вход</h1>
                </div>

                <form onSubmit={form.handleSubmit(onFormSubmit)} className="p-6 md:p-8 flex flex-col gap-4 md:gap-6">
                    <div className="flex flex-col gap-4 md:gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1 md:mb-2">
                                Email
                            </label>
                            <input
                                {...form.register("email")}
                                placeholder="example@email.com"
                                type="email"
                                className="w-full h-12 md:h-14 placeholder:text-gray-600 bg-orange-50 border-2 border-orange-200 rounded-xl px-4 text-black text-base md:text-lg"
                            />
                            {form.formState.errors.email && (
                                <p className="text-red-500 text-xs md:text-sm mt-1 ml-1">{form.formState.errors.email.message}</p>
                            )}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium mb-1 md:mb-2">
                                Пароль
                            </label>
                            <input
                                {...form.register("password")}
                                placeholder="Не менее 8 символов"
                                type="password"
                                className="w-full h-12 md:h-14 placeholder:text-gray-600 bg-orange-50 border-2 border-orange-200 rounded-xl px-4 text-black text-base md:text-lg"
                            />
                            {form.formState.errors.password && (
                                <p className="text-red-500 text-xs md:text-sm mt-1 ml-1">{form.formState.errors.password.message}</p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-12 md:h-14 bg-orange-500 text-white font-bold text-base md:text-lg rounded-xl hover:bg-orange-600 duration-200 mt-4 md:mt-6"
                    >
                        Войти
                    </button>
                    
                    <div className="text-center mt-4 md:mt-6 pt-4 md:pt-6 border-t border-orange-100">
                        <p className="text-gray-600 text-sm md:text-base">
                            Нет аккаунта?{" "}
                            <a
                                href="/auth/sign-up"
                                className="text-orange-500 font-semibold hover:text-orange-600 hover:underline transition-colors"
                            >
                                Зарегистрироваться
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}