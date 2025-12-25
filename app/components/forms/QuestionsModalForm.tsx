"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form as ShadcnForm, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import price from "@/public/Price.svg"

type questionsFormData = {
	name: string;
	email: string;
	message: string;
	consent: boolean;
	status?: 'new' | 'read';
};

const api = {
    forms: {
        questions: async (data: questionsFormData) => {
            const response = await fetch("/api/questions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            
            return {
                error: !response.ok,
                data: result
            };
        }
    }
};

const questionsFormSchema = z.object({
	name: z.string().min(2, "Имя слишком короткое"),
	email: z.string().email("Введите корректный email"),
	message: z.string().min(10, "Сообщение должно содержать минимум 10 символов"),
	consent: z.boolean().refine((val) => val === true, {
		message: "Необходимо согласие на обработку данных",
	}),
});

type questionsFormValues = z.infer<typeof questionsFormSchema>;

interface QuestionsModalFormProps {
    className?: string;
    buttonText?: string;
    textClassName?: string;
    icon?: StaticImageData;
}

export default function QuestionsModalForm({ 
    className = "",
    buttonText = "Задать вопрос",
    textClassName = "",
    icon = price
}: QuestionsModalFormProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<questionsFormValues>({
        resolver: zodResolver(questionsFormSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
            consent: false,
        },
    });

    const onSubmit = async (data: questionsFormValues) => {
        setIsLoading(true);
        try {
            const requestData = {
                ...data,
                status: 'new' as const
            };
            
            const result = await api.forms.questions(requestData);
            
            // if (result.error) {
            //     throw new Error("Ошибка при отправке");
            // }
            
            form.reset();
            setIsSuccess(true);
            alert("Ваш вопрос отправлен!");
            setIsModalOpen(false);
            
            setTimeout(() => setIsSuccess(false), 3000);
        } catch (error) {
            alert("Ошибка отправки");
        } finally {
            setIsLoading(false);
        }
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
                    <Image src={icon} alt="Question" width={20} height={20} />
                    <p className={`text-white font-bold ${textClassName || "text-[13px]"}`}>
                    {buttonText}</p>
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
                                <X className="md:w-10 md:h-10 w-7 h-7" strokeWidth={1.5}/>
                            </button>
                        </div>

                        <div className="px-9 md:px-14 py-8 flex flex-col justify-center items-center gap-7">
                            <div className="flex items-center justify-center gap-4">
                                <Image src={price} alt="Question" width={30} height={25} />
                                <h2 className="md:text-2xl text-xl font-bold text-white text-center">
                                    Остались вопросы?
                                </h2>
                            </div>

                            <ShadcnForm {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
                                    <FormField control={form.control} name="name" render={({ field }) => (
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
                                    )}/>

                                    <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input 
                                                    type="email"
                                                    placeholder="Email" 
                                                    {...field} 
                                                    className="h-12 pl-4 bg-gray-100 placeholder:text-[#424268] placeholder:text-[17px]"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>

                                    <FormField control={form.control} name="message" render={({ field }) => (
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
                                    )}/>

                                    <FormField control={form.control} name="consent" render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <div className="flex flex-row items-start gap-3">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={(checked) => {
                                                            field.onChange(checked === true);
                                                        }}
                                                        className="bg-white 
                                                        data-[state=checked]:bg-white 
                                                        data-[state=checked]:text-black"
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel className="text-sm font-normal text-white"> 
                                                        Я согласен(на) на обработку{' '}
                                                        <a href="/" className="text-orange-500" target="_blank">
                                                            персональных данных
                                                        </a>
                                                    </FormLabel>
                                                </div>
                                            </div>
                                            <FormMessage className="text-sm text-center text-white" />
                                        </FormItem>
                                    )}/>

                                    <div className="flex justify-center mt-4">
                                        <Button 
                                            type="submit" 
                                            className="bg-white hover:bg-gray-200 py-3.5 px-12 text-[#2F2F51] font-bold text-base transition-colors w-full md:w-auto"
                                            disabled={isLoading || isSuccess}
                                        >
                                            {isLoading ? "Отправка..." : isSuccess ? "Отправлено!" : "Отправить вопрос"}
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