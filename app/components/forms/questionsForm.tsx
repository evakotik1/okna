"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form as ShadcnForm, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type ContactFormData = {
	name: string;
	email: string;
	message: string;
	consent: boolean;
};

const api = {
    forms: {
        contact: async (data: ContactFormData) => {
            const response = await fetch("/api/contact", {
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

const contactFormSchema = z.object({
	name: z.string().min(2, "Имя слишком короткое"),
	email: z.string().email("Введите корректный email"),
	message: z.string().min(10, "Сообщение должно содержать минимум 10 символов"),
	consent: z.boolean().refine((val) => val === true, {
		message: "Необходимо согласие на обработку данных",
	}),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function QuestionsForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const form = useForm<ContactFormValues>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			name: "",
			email: "",
			message: "",
			consent: false,
		},
	});

	const onSubmit = async (data: ContactFormValues) => {
		setIsLoading(true);
		try {
			const result = await api.forms.contact(data);
			
			if (result.error) {
				throw new Error("Ошибка при отправке");
			}
			
			form.reset();
			setIsSuccess(true);
			alert("Сообщение отправлено!");
			
			setTimeout(() => setIsSuccess(false), 3000);
		} catch (error) {
			alert("Ошибка отправки");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full mx-auto p-12 flex flex-col gap-6">
			<h2 className="text-2xl font-bold text-center">Остались вопросы?</h2>
			
			<ShadcnForm {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
					<FormField control={form.control} name="name" render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input 
										placeholder="Ваше имя" 
										{...field} 
										className="h-14 pl-4 bg-[#E2E2E2] placeholder:text-[#424268]"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField control={form.control} name="email" render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input 
										type="email"
										placeholder="Email" 
										{...field} 
										className="h-14 pl-4 bg-[#E2E2E2] placeholder:text-[#424268] "
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField control={form.control} name="message" render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea 
										placeholder="Ваш отзыв" 
										{...field} 
										className="min-h-[120px] pl-4 pt-3 bg-[#E2E2E2] placeholder:text-[#424268]"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField control={form.control} name="consent" render={({ field }) => (
							<FormItem className="flex flex-row items-start gap-3">
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={(checked) => {
											field.onChange(checked === true);
										}}
									/>
								</FormControl>
								<div className="space-y-1 leading-none">
								<FormLabel className="text-sm font-normal"> Я согласен(на) на обработку{' '}
										<a href="/" className="text-orange-500 font-bold" target="_blank"> персональных данных </a>
									</FormLabel>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>


					<div className="flex justify-center pt-2">
						<Button type="submit" className="bg-[#2F2F51] py-4 px-10 w-full max-w-[280px] text-white font-medium hover:bg-[#4C4C79] transition-colors" disabled={isLoading || isSuccess} >
							{isLoading ? "Отправка..." : isSuccess ? "Отправлено!" : "Отправить сообщение"}
						</Button>
					</div>
				</form>
			</ShadcnForm>
		</div>
	);
}