// // /** biome-ignore-all assist/source/organizeImports: <explanation> */
// // "use client";

// // import {
// // 	Sheet,
// // 	SheetClose,
// // 	SheetContent,
// // 	SheetTrigger,
// // } from "@/app/components/ui/sheet";
// // import {
// // 	Form,
// // 	FormControl,
// // 	FormField,
// // 	FormItem,
// // 	FormLabel,
// // 	FormMessage,
// // } from "@/app/components/ui/form";
// // import { Input } from "@/app/components/ui/input";
// // import { Button } from "@/app/components/ui/button";
// // import { Pencil, X, Trash2 } from "lucide-react";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { useMutation, useQueryClient } from "@tanstack/react-query";
// // import { useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { calculationSchema } from "@/app/lib/shared/schemas/calculation";
// // import { api } from "@/app/lib/client/api";
// // import { Checkbox } from "@/app/components/ui/checkbox";
// // import type { z } from "zod";
// // import { Calculation } from "@/app/lib/shared/types/calculation";

// // // Создаем тип из схемы
// // type CalculationFormData = z.infer<typeof calculationSchema>;

// // export default function CreateUpdateCalculation({
// // 	calculation,
// // }: {
// // 	calculation?: Calculation;
// // }) {
// // 	const [open, setOpen] = useState(false);
// // 	const queryClient = useQueryClient();

// // 	// ВАЖНО: defaultValues должны точно соответствовать схеме
// // 	const getDefaultValues = (): CalculationFormData => {
// // 		if (calculation) {
// // 			return {
// // 				name: calculation.name || "",
// // 				phone: calculation.phone || "",
// // 				email: calculation.email || "",
// // 				consent: calculation.consent ?? false, // Преобразуем null/undefined в false
// // 				// status опционален, можно не включать если undefined
// // 				...(calculation.status && { status: calculation.status }),
// // 			};
// // 		}
		
// // 		// Значения по умолчанию для новой заявки
// // 		return {
// // 			name: "",
// // 			phone: "",
// // 			email: "",
// // 			consent: false,
// // 		};
// // 	};

// // 	const form = useForm<CalculationFormData>({
// // 		resolver: zodResolver(calculationSchema),
// // 		defaultValues: getDefaultValues(),
// // 	});

// // 	// Мутация для удаления
// // 	const deleteCalculationMutation = useMutation({
// // 		mutationFn: async () => {
// // 			if (!calculation?.id) throw new Error("No calculation to delete");
			
// // 			// Проверяем как выглядит API
// // 			console.log("Deleting calculation with ID:", calculation.id);
			
// // 			// Пробуем разные варианты вызова API
// // 			try {
// // 				// Вариант 1
// // 				const res = await api.calculation({ id: calculation.id }).delete();
// // 				return res.data;
// // 			} catch (error: any) {
// // 				console.error("Delete error:", error);
// // 				// Вариант 2: если API другой
// // 				// const res = await api.calculation.delete({ id: calculation.id });
// // 				// return res.data;
// // 				throw error;
// // 			}
// // 		},
// // 		onSuccess: () => {
// // 			queryClient.invalidateQueries({ queryKey: ["calculations"] });
// // 			alert("Заявка на расчет удалена!");
// // 			setOpen(false);
// // 		},
// // 		onError: (error: any) => {
// // 			console.error("Delete mutation error:", error);
// // 			alert(`Ошибка при удалении: ${error.message || "Неизвестная ошибка"}`);
// // 		},
// // 	});

// // 	const createCalculationMutation = useMutation({
// // 		mutationFn: async (data: CalculationFormData) => {
// // 			console.log("Creating calculation:", data);
			
// // 			// Убираем status если он undefined (опционален в схеме)
// // 			const dataToSend = { ...data };
// // 			if (dataToSend.status === undefined) {
// // 				delete dataToSend.status;
// // 			}
			
// // 			const res = await api.calculation.post(dataToSend);
// // 			return res.data;
// // 		},
// // 		onSuccess: () => {
// // 			setOpen(false);
// // 			queryClient.invalidateQueries({ queryKey: ["calculations"] });
// // 			form.reset();
// // 			alert("Заявка на расчет создана!");
// // 		},
// // 		onError: (error: any) => {
// // 			console.error("Create error:", error);
// // 			alert(`Ошибка при создании: ${error.message || "Неизвестная ошибка"}`);
// // 		},
// // 	});

// // 	const updateCalculationMutation = useMutation({
// // 		mutationFn: async (data: CalculationFormData) => {
// // 			if (!calculation?.id) throw new Error("No calculation to update");
			
// // 			console.log("Updating calculation:", data);
			
// // 			// Убираем status если он undefined
// // 			const dataToSend = { ...data };
// // 			if (dataToSend.status === undefined) {
// // 				delete dataToSend.status;
// // 			}
			
// // 			const res = await api.calculation({ id: calculation.id }).put(dataToSend);
// // 			return res.data;
// // 		},
// // 		onSuccess: () => {
// // 			queryClient.invalidateQueries({ queryKey: ["calculations"] });
// // 			form.reset();
// // 			setOpen(false);
// // 			alert("Заявка на расчет обновлена!");
// // 		},
// // 		onError: (error: any) => {
// // 			console.error("Update error:", error);
// // 			alert(`Ошибка при обновлении: ${error.message || "Неизвестная ошибка"}`);
// // 		},
// // 	});

// // 	const onSubmit = (data: CalculationFormData) => {
// // 		console.log("Form submitted:", data);
		
// // 		// Валидация консента
// // 		if (data.consent === undefined) {
// // 			data.consent = false;
// // 		}
		
// // 		if (calculation) {
// // 			updateCalculationMutation.mutate(data);
// // 		} else {
// // 			createCalculationMutation.mutate(data);
// // 		}
// // 	};

// // 	const handleDelete = (e: React.MouseEvent) => {
// // 		e.stopPropagation();
// // 		e.preventDefault();
		
// // 		if (!calculation) return;
		
// // 		if (confirm(`Удалить заявку на расчет от ${calculation.name}?`)) {
// // 			deleteCalculationMutation.mutate();
// // 		}
// // 	};

// // 	// Для SheetTrigger
// // 	const handleSheetTrigger = (e: React.MouseEvent) => {
// // 		if (!calculation) {
// // 			e.stopPropagation();
// // 		}
// // 	};

// // 	return (
// // 		<Sheet open={open} onOpenChange={setOpen}>
// // 			<SheetTrigger asChild>
// // 				{!!calculation ? (
// // 					<div className="flex gap-2" onClick={handleSheetTrigger}>
// // 						<Button variant="ghost" size="icon">
// // 							<Pencil className="h-4 w-4" />
// // 						</Button>
// // 						<Button 
// // 							variant="ghost" 
// // 							size="icon"
// // 							onClick={handleDelete}
// // 							disabled={deleteCalculationMutation.isPending}
// // 							className="text-red-600 hover:text-red-700 hover:bg-red-50"
// // 						>
// // 							<Trash2 className="h-4 w-4" />
// // 						</Button>
// // 					</div>
// // 				) : (
// // 					<Button className="size-fit">Добавить расчет</Button>
// // 				)}
// // 			</SheetTrigger>
// // 			<SheetContent className="md:w-1/3 w-screen p-4 notranslate">
// // 				<Form {...form}>
// // 					<form
// // 						onSubmit={form.handleSubmit(onSubmit)}
// // 						className="space-y-6 relative"
// // 					>
// // 						<SheetClose className="md:hidden absolute -top-0 right-0">
// // 							<X />
// // 						</SheetClose>
						
// // 						<FormField
// // 							control={form.control}
// // 							name="name"
// // 							render={({ field }) => (
// // 								<FormItem>
// // 									<FormLabel>Имя</FormLabel>
// // 									<FormControl>
// // 										<Input placeholder="Имя" {...field} value={field.value || ""} />
// // 									</FormControl>
// // 									<FormMessage />
// // 								</FormItem>
// // 							)}
// // 						/>
						
// // 						<FormField
// // 							control={form.control}
// // 							name="phone"
// // 							render={({ field }) => (
// // 								<FormItem>
// // 									<FormLabel>Телефон</FormLabel>
// // 									<FormControl>
// // 										<Input placeholder="Телефон" {...field} value={field.value || ""} />
// // 									</FormControl>
// // 									<FormMessage />
// // 								</FormItem>
// // 							)}
// // 						/>
						
// // 						<FormField
// // 							control={form.control}
// // 							name="email"
// // 							render={({ field }) => (
// // 								<FormItem>
// // 									<FormLabel>Email</FormLabel>
// // 									<FormControl>
// // 										<Input 
// // 											placeholder="Email" 
// // 											{...field} 
// // 											value={field.value || ""}
// // 											type="email"
// // 										/>
// // 									</FormControl>
// // 									<FormMessage />
// // 								</FormItem>
// // 							)}
// // 						/>
						
// // 						<FormField
// // 							control={form.control}
// // 							name="consent"
// // 							render={({ field }) => (
// // 								<FormItem className="flex flex-col gap-2">
// // 									<div className="flex flex-row gap-4 items-center">
// // 										<FormControl>
// // 											<Checkbox
// // 												checked={field.value}
// // 												onCheckedChange={(checked) => {
// // 													field.onChange(checked === true);
// // 												}}
// // 												className="data-[state=checked]:border-blue-600"
// // 											/>
// // 										</FormControl>
// // 										<FormLabel className="text-sm font-normal cursor-pointer">
// // 											Согласен на обработку персональных данных
// // 										</FormLabel>
// // 									</div>
// // 									<FormMessage />
// // 								</FormItem>
// // 							)}
// // 						/>
						
// // 						<div className="flex gap-2 pt-4">
// // 							<Button
// // 								type="submit"
// // 								variant="default"
// // 								disabled={
// // 									createCalculationMutation.isPending ||
// // 									updateCalculationMutation.isPending
// // 								}
// // 							>
// // 								{createCalculationMutation.isPending || updateCalculationMutation.isPending
// // 									? "Сохранение..."
// // 									: "Сохранить"}
// // 							</Button>
							
// // 							{calculation && (
// // 								<Button
// // 									type="button"
// // 									variant="destructive"
// // 									onClick={handleDelete}
// // 									disabled={deleteCalculationMutation.isPending}
// // 								>
// // 									{deleteCalculationMutation.isPending ? "Удаление..." : "Удалить"}
// // 								</Button>
// // 							)}
// // 						</div>
// // 					</form>
// // 				</Form>
// // 			</SheetContent>
// // 		</Sheet>
// // 	);
// // }


// "use client";

// import {
// 	Sheet,
// 	SheetClose,
// 	SheetContent,
// 	SheetTrigger,
// } from "@/app/components/ui/sheet";
// import {
// 	Form,
// 	FormControl,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// 	FormMessage,
// } from "@/app/components/ui/form";
// import { Input } from "@/app/components/ui/input";
// import { Button } from "@/app/components/ui/button";
// import { Pencil, X, Trash2 } from "lucide-react"; // Добавил Trash2
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import z from "zod/v4";
// import { api } from "@/app/lib/client/api";
// import { OnError } from "@/app/lib/client/on-error";
// import { Checkbox } from "@/app/components/ui/checkbox";
// import { queryClient } from "@/lib/query-client";
// import { Calculation } from "@/app/lib/shared/types/calculation";
// import { calculationSchema } from "@/app/lib/shared/schemas/calculation";
// import { measurement } from "@/app/server/db/schema";


// export default function CreateUpdatecalculation({
// 	calculation,
// }: {
// 	calculation?: Calculation;
// }) {
// 	const [open, setOpen] = useState(false);

// 	const form = useForm<z.infer<typeof calculationSchema>>({
// 		resolver: zodResolver(calculationSchema),
// 		defaultValues: (calculation
// 			? {
// 					...calculation,
// 				}
// 			: {}) as unknown as z.infer<typeof calculationSchema>,
// 	});


// 	const deletecalculationMutation = useMutation({
// 		mutationFn: async () => {
// 			if (!calculation) throw new Error("No calculation to delete");
// 			const res = await api.measurement({ id: calculation.id }).delete();
// 			if (res.error) throw res.error;
// 			return res.data;
// 		},
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({
// 				queryKey: ["calculations"],
// 			});
// 			alert("Заявка удалена!");
// 			setOpen(false);
// 		},
// 		onError: () => {
// 			alert("Ошибка при удалении");
// 		},
// 	});

// 	const createcalculationMutation = useMutation({
// 		mutationKey: ["createcalculation"],
// 		mutationFn: async (data: z.infer<typeof calculationSchema>) => {
// 			const res = await api.calculation.post({
// 				...data,
// 			});
// 			if (res.error) throw res.error;
// 			return data;
// 		},
// 		onSuccess: (data) => {
// 			setOpen(false);
// 			queryClient.invalidateQueries({
// 				queryKey: ["calculations"],
// 			});
// 			form.reset();

// 		},
// 		onError: (error) => {
// 			console.error({ error })
// 		},
// 	});

// 	const updatecalculationMutation = useMutation({
// 		mutationKey: ["updatecalculation", calculation?.id ?? "-1"],
// 		mutationFn: async (data: z.infer<typeof calculationSchema>) => {
// 			const res = await api.calculation({ id: calculation!.id }).put({
// 				...data,
// 			});
// 			if (res.error) throw res.error;
// 			return res.data;
// 		},
// 		onSuccess: () => {

// 			queryClient.invalidateQueries({
// 				queryKey: ["calculations"],
// 			});
// 			form.reset();
// 			setOpen(false);
// 		},
// 		onError: () => {

// 		},
// 	});

// 	const onSubmit = (data: z.infer<typeof calculationSchema>) => {
// 		console.log(data);
// 		if (calculation) {
// 			updatecalculationMutation.mutate(data);
// 		} else {
// 			createcalculationMutation.mutate(data);
// 		}
// 	};


// 	const handleDelete = () => {
// 		if (!calculation) return;
		
// 		if (confirm(`Удалить заявку от ${calculation.name}?`)) {
// 			deletecalculationMutation.mutate();
// 		}
// 	};

// 	return (
// 		<Sheet open={open} onOpenChange={setOpen}>
// 			<SheetTrigger asChild className="w-1/5">
// 				{!!calculation ? (
// 					<div className="flex gap-2">
// 						<Button variant="ghost" size="icon">
// 							<Pencil className="h-4 w-4" />
// 						</Button>
// 						<Button 
// 							variant="ghost" 
// 							size="icon"
// 							onClick={(e) => {
// 								e.stopPropagation(); 
// 								handleDelete();
// 							}}
// 							disabled={deletecalculationMutation.isPending}
// 							className="text-red-600 hover:text-red-700 hover:bg-red-50"
// 						>
// 							<Trash2 className="h-4 w-4" />
// 						</Button>
// 					</div>
// 				) : (
// 					<Button className="size-fit">Добавить партнера</Button>
// 				)}
// 			</SheetTrigger>
// 			<SheetContent className="md:w-1/3 w-screen p-4 notranslate">
// 				<Form {...form}>
// 					<form
// 						onSubmit={form.handleSubmit(onSubmit, OnError)}
// 						className="space-y-6 relative"
// 					>
// 						<SheetClose className="md:hidden absolute -top-0 right-0">
// 							<X />
// 						</SheetClose>
// 						<FormField
// 							control={form.control}
// 							name="name"
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>Имя</FormLabel>
// 									<FormControl>
// 										<Input placeholder="Имя" {...field} />
// 									</FormControl>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/>
// 						<FormField
// 							control={form.control}
// 							name="phone"
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>Телефон</FormLabel>
// 									<FormControl>
// 										<Input placeholder="Телефон" {...field} />
// 									</FormControl>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/>
// 						<FormField
// 							control={form.control}
// 							name="email"
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>Email</FormLabel>
// 									<FormControl>
// 										<Input placeholder="Email" {...field} />
// 									</FormControl>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/>
// 						<FormField
// 							control={form.control}
// 							name="consent"
// 							render={({ field }) => (
// 								<FormItem className="flex flex-col gap-2">
// 									<div className="flex flex-row gap-4 items-center justify-center">
// 										<FormControl>
// 											<Checkbox
// 												id="toggle-2"
// 												checked={field.value ?? false}
// 												onCheckedChange={(checked) => field.onChange(checked)}
// 												defaultChecked
// 												className="data-[state=checked]:border-blue-60 w-h h-4 aspect-square data-[state=checked]:bg-black data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
// 											/>
// 										</FormControl>
// 										<div className="space-y-1 leading-none">
// 											<FormLabel className="text-[12px] font-normal">
// 												Согласен на обработку персональных данных в соответствии
// 												с{" "}
// 												<a href="/" className="text-blue-600" target="_blank">
// 													политикой конфиденциальности
// 												</a>
// 											</FormLabel>
// 										</div>
// 									</div>
// 									<FormMessage className="text-[12px] text-center" />
// 								</FormItem>
// 							)}
// 						/>

// 						<div className="flex gap-2"> 
// 							<Button
// 								type="submit"
// 								variant={"default"}
// 								disabled={
// 									createcalculationMutation.isPending ||
// 									updatecalculationMutation.isPending
// 								}
// 							>
// 								Сохранить
// 							</Button>
							
// 							{calculation && (
// 								<Button
// 									type="button"
// 									variant={"destructive"}
// 									onClick={handleDelete}
// 									disabled={deletecalculationMutation.isPending}
// 								>
// 									Удалить
// 								</Button>
// 							)}
// 						</div>
// 					</form>
// 				</Form>
// 			</SheetContent>
// 		</Sheet>
// 	);
// }