// app/components/modals/MeasurementModal.tsx
"use client";

import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form as ShadcnForm, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface MeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// API
const api = {
    forms: {
        post: async (data: FormData) => {
            const response = await fetch("/api/measurement", {
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

// Схема
const formSchema = z.object({
	name: z.string().min(2, "Имя слишком короткое"),
	phone: z.string().min(11, "Номер телефона должен содержать минимум 11 цифр"),
	email: z.string().email("Введите корректный email"),
	consent: z.boolean().refine((val) => val === true, {
		message: "Необходимо согласие на обработку данных",
	}),
});

type FormData = z.infer<typeof formSchema>;

export default function MeasurementModal({ isOpen, onClose }: MeasurementModalProps) {
  const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			phone: "",
			email: "",
			consent: false,
		},
	});

	const onSubmit = async (data: FormData) => {
		setIsLoading(true);
		try {
			const result = await api.forms.post(data);
			
			if (result.error) {
				throw new Error("Ошибка при отправке");
			}
			
			form.reset();
			setIsSuccess(true);
			alert("Заявка отправлена!");
			onClose(); // Закрываем модалку после успешной отправки
		} catch (error) {
			alert("Ошибка отправки");
		} finally {
			setIsLoading(false);
		}
	};

	const formatPhone = (value: string): string => {
		let cleaned = value.replace(/\D/g, '');
		if (cleaned.length > 11) cleaned = cleaned.substring(0, 11);
		
		if (cleaned.length === 0) return '';
		if (cleaned.length <= 3) return cleaned;
		if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
		if (cleaned.length <= 8) return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
		
		return `${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9)}`;
	};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative bg-white rounded-xl w-full max-w-2xl shadow-xl">
        
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-gray-500 hover:text-gray-700 bg-gray-100 rounded-full p-2"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Форма как на фото */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Вызвать замерщика на дом</h2>
          
          <ShadcnForm {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-md mx-auto">
              
              {/* Имя */}
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Ваше имя</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Представьтесь пожалуйста" 
                      {...field} 
                      className="h-12 pl-4 bg-[#E2E2E2] placeholder:text-[#424268]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>

              {/* Телефон */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Номер телефона</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="+7 (999) 999-99-99" 
                        {...field} 
                        onChange={(e) => {
                          const formatted = formatPhone(e.target.value);
                          field.onChange(formatted);
                        }}
                        value={field.value}
                        className="h-12 pl-4 bg-[#E2E2E2] placeholder:text-[#424268]" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">E-mail</FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="example@mail.com" 
                      {...field} 
                      className="h-12 pl-4 bg-[#E2E2E2] placeholder:text-[#424268]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>

              {/* Чекбокс */}
              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-4 items-center">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked === true);
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        Я согласен(на) на обработку персональных данных
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Кнопка */}
              <div className="flex justify-center pt-4">
                <Button 
                  type="submit" 
                  className="bg-orange-500 py-4 px-10 w-[200px] text-white font-medium hover:bg-orange-600 transition-colors" 
                  disabled={isLoading || isSuccess}
                >
                  {isLoading ? "Отправка..." : isSuccess ? "Отправлено" : "Отправить заявку"}
                </Button>
              </div>
            </form>
          </ShadcnForm>
        </div>
      </div>
    </div>
  );
}