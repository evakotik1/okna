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
import z from "zod/v4";
import { api } from "@/app/lib/client/api";
import { OnError } from "@/app/lib/client/on-error";
import { Checkbox } from "@/app/components/ui/checkbox";
import { queryClient } from "@/lib/query-client"
import { toast } from "sonner";
import { Question } from "@/app/lib/shared/types/question";
import { questionsSchema } from "@/app/lib/shared/schemas/questions";

export default function CreateUpdatequestions({
	questions,
}: {
	questions?: Question;
}) {
	const [open, setOpen] = useState(false);

	const form = useForm<z.infer<typeof questionsSchema>>({
		resolver: zodResolver(questionsSchema),
		defaultValues: (questions
			? {
					...questions,
				}
			: {}) as unknown as z.infer<typeof questionsSchema>,
	});

	const createquestionsMutation = useMutation({
		mutationKey: ["createquestions"],
		mutationFn: async (data: z.infer<typeof questionsSchema>) => {
			const res = await api.questions.post({
				...data,
			});
			if (res.error) throw res.error;
			return data;
		},
		onSuccess: (data) => {
			setOpen(false);
			queryClient.invalidateQueries({
				queryKey: ["questionss"],
			});
			form.reset();
				toast.success("Вопрос создан");
		},
		onError: (error) => {
			console.error({ error });
				toast.error("Ошибка при создании вопроса");
		},
	});

	const updatequestionsMutation = useMutation({
		mutationKey: ["updatequestions", questions?.id ?? "-1"],
		mutationFn: async (data: z.infer<typeof questionsSchema>) => {
			const res = await api.questions({ id: questions!.id }).put({
				...data,
			});
			if (res.error) throw res.error;
			return res.data;
		},
		onSuccess: () => {
			toast.success("Изменения сохранены");
			queryClient.invalidateQueries({
				queryKey: ["questions"],
			});
			form.reset();
			setOpen(false);
		},
		onError: () => {
			toast.error("Ошибка при обновлении вопроса");
		},
	});

	const onSubmit = (data: z.infer<typeof questionsSchema>) => {
		console.log(data);
		if (questions) {
			updatequestionsMutation.mutate(data);
		} else {
			createquestionsMutation.mutate(data);
		}
	};

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild className="w-1/5">
				{!!questions ? (
					<Button variant="ghost" size="icon">
						<Pencil className="h-4 w-4" />
					</Button>
				) : (
					<Button className="size-fit">Добавить вопрос</Button>
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
							name="message"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Отзыв</FormLabel>
									<FormControl>
										<Input placeholder="Отзыв" {...field} />
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
								createquestionsMutation.isPending ||
								updatequestionsMutation.isPending
							}
							//   loading={
							//     createreviewsMutation.isPending ||
							//     updatereviewsMutation.isPending
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
