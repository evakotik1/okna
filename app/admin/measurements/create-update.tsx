"use client";

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@/app/components/ui/sheet";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Pencil, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Measurement } from "@/app/lib/shared/types/measurements";
import z from "zod/v4";
import { measurementSchema } from "@/app/lib/shared/schemas/measuremen";
import { api } from "@/app/lib/client/api";
import { OnError } from "@/app/lib/client/on-error";
import { Checkbox } from "@/app/components/ui/checkbox";
import { queryClient } from "@/lib/query-client"
import { toast } from "sonner";

export default function CreateUpdateMeasurement({
	measurement,
}: {
	measurement?: Measurement;
}) {
	const [open, setOpen] = useState(false);

	const form = useForm<z.infer<typeof measurementSchema>>({
		resolver: zodResolver(measurementSchema),
		defaultValues: (measurement
			? {
					...measurement,
				}
			: {}) as unknown as z.infer<typeof measurementSchema>,
	});

	const createMeasurementMutation = useMutation({
		mutationKey: ["createMeasurement"],
		mutationFn: async (data: z.infer<typeof measurementSchema>) => {
			const res = await api.measurement.post({
				...data,
			});
			if (res.error) throw res.error;
			return data;
		},
		onSuccess: (data) => {
			setOpen(false);
			queryClient.invalidateQueries({
				queryKey: ["measurements"],
			});
			form.reset();
				toast.success("Заявка создан");
		},
		onError: (error) => {
			console.error({ error });
				toast.error("Ошибка при создании партнера");
		},
	});

	const updateMeasurementMutation = useMutation({
		mutationKey: ["updateMeasurement", measurement?.id ?? "-1"],
		mutationFn: async (data: z.infer<typeof measurementSchema>) => {
			const res = await api.measurement({ id: measurement!.id }).put({
				...data,
			});
			if (res.error) throw res.error;
			return res.data;
		},
		onSuccess: () => {
			toast.success("Изменения сохранены");
			queryClient.invalidateQueries({
				queryKey: ["measurements"],
			});
			form.reset();
			setOpen(false);
		},
		onError: () => {
			toast.error("Ошибка при обновлении заявки");
		},
	});

	const onSubmit = (data: z.infer<typeof measurementSchema>) => {
		console.log(data);
		if (measurement) {
			updateMeasurementMutation.mutate(data);
		} else {
			createMeasurementMutation.mutate(data);
		}
	};

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild className="w-1/5">
				{!!measurement ? (
					<Button variant="ghost" size="icon">
						<Pencil className="h-4 w-4" />
					</Button>
				) : (
					<Button className="size-fit">Добавить заявку</Button>
				)}
			</SheetTrigger>
			<SheetContent className="md:w-1/3 w-screen p-4 notranslate">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit, OnError)}
						className="space-y-6 relative"
					>
						<SheetClose className="md:hidden absolute -top-0 right-0">
							<X />
						</SheetClose>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Имя</FormLabel>
									<FormControl>
										<Input placeholder="Имя" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Телефон</FormLabel>
									<FormControl>
										<Input placeholder="Телефон" {...field} />
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
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="Email" {...field} />
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
									<div className="flex flex-row gap-4 items-center justify-center">
										<FormControl>
											<Checkbox
												id="toggle-2"
												checked={field.value ?? false}
												onCheckedChange={(checked) => field.onChange(checked)}
												defaultChecked
												className="data-[state=checked]:border-blue-60 w-h h-4 aspect-square data-[state=checked]:bg-black data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
											/>
										</FormControl>
										<div className="space-y-1 leading-none">
											<FormLabel className="text-[12px] font-normal">
												Согласен на обработку персональных данных в соответствии
												с{" "}
												<a href="/" className="text-blue-600" target="_blank">
													политикой конфиденциальности
												</a>
											</FormLabel>
										</div>
									</div>
									<FormMessage className="text-[12px] text-center" />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							variant={"default"}
							disabled={
								createMeasurementMutation.isPending ||
								updateMeasurementMutation.isPending
							}
							//   loading={
							//     createMeasurementMutation.isPending ||
							//     updateMeasurementMutation.isPending
							//   }
						>
							Сохранить
						</Button>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
}



/** biome-ignore-all assist/source/organizeImports: <explanation> */







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
// import { Pencil, X, Trash2 } from "lucide-react"; 
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Measurement } from "@/app/lib/shared/types/measurements";
// import z from "zod/v4";
// import { measurementSchema } from "@/app/lib/shared/schemas/measuremen";
// import { api } from "@/app/lib/client/api";
// import { OnError } from "@/app/lib/client/on-error";
// import { Checkbox } from "@/app/components/ui/checkbox";
// import { queryClient } from "@/lib/query-client";
// import { toast } from "sonner";

// export default function CreateUpdateMeasurement({
// 	measurement,
// }: {
// 	measurement?: Measurement;
// }) {
// 	const [open, setOpen] = useState(false);

// 	const form = useForm<z.infer<typeof measurementSchema>>({
// 		resolver: zodResolver(measurementSchema),
// 		defaultValues: (measurement
// 			? {
// 					...measurement,
// 				}
// 			: {}) as unknown as z.infer<typeof measurementSchema>,
// 	});

// 	const deleteMeasurementMutation = useMutation({
// 		mutationFn: async () => {
// 			if (!measurement) throw new Error("No measurement to delete");
// 			const res = await api.measurement({ id: measurement.id }).delete();
// 			if (res.error) throw res.error;
// 			return res.data;
// 		},
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({
// 				queryKey: ["measurements"],
// 			});
// 			toast("Заявка удалена!");
// 			setOpen(false);
// 		},
// 		onError: () => {
// 			toast("Ошибка при удалении");
// 		},
// 	});

// 	const createMeasurementMutation = useMutation({
// 		mutationKey: ["createMeasurement"],
// 		mutationFn: async (data: z.infer<typeof measurementSchema>) => {
// 			const res = await api.measurement.post({
// 				...data,
// 			});
// 			if (res.error) throw res.error;
// 			return data;
// 		},
// 		onSuccess: (data) => {
// 			setOpen(false);
// 			queryClient.invalidateQueries({
// 				queryKey: ["measurements"],
// 			});
// 			form.reset();
// 				toast.success("Партнер создан");
// 		},
// 		onError: (error) => {
// 			console.error({ error });
// 			  	toast.error("Ошибка при создании партнера");
// 		},
// 	});

// 	const updateMeasurementMutation = useMutation({
// 		mutationKey: ["updateMeasurement", measurement?.id ?? "-1"],
// 		mutationFn: async (data: z.infer<typeof measurementSchema>) => {
// 			const res = await api.measurement({ id: measurement!.id }).put({
// 				...data,
// 			});
// 			if (res.error) throw res.error;
// 			return res.data;
// 		},
// 		onSuccess: () => {
// 			toast.success("Изменения сохранены");
// 			queryClient.invalidateQueries({
// 				queryKey: ["measurements"],
// 			});
// 			form.reset();
// 			setOpen(false);
// 		},
// 		onError: () => {
// 			toast.error("Ошибка при обновлении партнера");
// 		},
// 	});

// 	const onSubmit = (data: z.infer<typeof measurementSchema>) => {
// 		console.log(data);
// 		if (measurement) {
// 			updateMeasurementMutation.mutate(data);
// 		} else {
// 			createMeasurementMutation.mutate(data);
// 		}
// 	};

// 	const handleDelete = () => {
// 		if (!measurement) return;
		
// 		if (confirm(`Удалить заявку от ${measurement.name}?`)) {
// 			deleteMeasurementMutation.mutate();
// 		}
// 	};

// 	return (
// 		<Sheet open={open} onOpenChange={setOpen}>
// 			<SheetTrigger asChild className="w-1/5">
// 				{!!measurement ? (
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
// 							disabled={deleteMeasurementMutation.isPending}
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
// 									createMeasurementMutation.isPending ||
// 									updateMeasurementMutation.isPending
// 								}
// 							>
// 								Сохранить
// 							</Button>
							
// 							{measurement && (
// 								<Button
// 									type="button"
// 									variant={"destructive"}
// 									onClick={handleDelete}
// 									disabled={deleteMeasurementMutation.isPending}
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