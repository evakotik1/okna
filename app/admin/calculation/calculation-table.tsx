// "use client";

// import { useQuery, useMutation } from "@tanstack/react-query";
// import {
// 	Table,
// 	TableBody,
// 	TableCell,
// 	TableHead,
// 	TableHeader,
// 	TableRow,
// } from "@/app/components/ui/table";
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from "@/app/components/ui/select";
// import { api } from "@/app/lib/client/api";
// import { format } from "date-fns";
// import { ColumnDef } from "@tanstack/react-table";
// import CreateUpdateCalculation from "./create-update-calculation";
// import { DataTable } from "@/app/components/ui/data-table";
// import { Button } from "@/app/components/ui/button";
// import { useMemo } from "react";
// import { Calculation } from "@/app/lib/shared/types/calculation";

// export function CalculationsTable({
// 	initialCalculations: initialData,
// }: {
// 	initialCalculations: Calculation[];
// }) {
// 	const { data: calculations } = useQuery({
// 		queryKey: ["calculations"],
// 		queryFn: async () => {
// 			return (await api.calculation.get()).data;
// 		},
// 		initialData,
// 	});

// 	const updateStatus = useMutation({
// 		mutationFn: async ({
// 			id,
// 			status,
// 		}: {
// 			id: string;
// 			status: "PROCESSING" | "COMPLETED";
// 		}) => {
// 			const res = await api.calculation.status({ id }).put({ status });
// 			return res.data;
// 		},
// 	});

// 	const columns: ColumnDef<Calculation>[] = useMemo(() => [
// 		{
// 			accessorKey: "name",
// 			header: "Имя",
// 			cell: ({ row }) => <p>{row.original.name}</p>,
// 		},
// 		{
// 			accessorKey: "email",
// 			header: "Email",
// 			cell: ({ row }) => (
// 				<p className="text-blue-600 hover:underline cursor-pointer">
// 					{row.original.email}
// 				</p>
// 			),
// 		},
// 		{
// 			accessorKey: "phone",
// 			header: "Телефон",
// 			cell: ({ row }) => (
// 				<a 
// 					href={`tel:${row.original.phone}`}
// 					className="text-blue-600 hover:underline"
// 				>
// 					{row.original.phone}
// 				</a>
// 			),
// 		},
// 		{
// 			accessorKey: "consent",
// 			header: "Согласие",
// 			cell: ({ row }) => (
// 				<p className={row.original.consent ? "text-green-600" : "text-red-600"}>
// 					{row.original.consent ? "Да" : "Нет"}
// 				</p>
// 			),
// 		},
// 		{
// 			accessorKey: "status",
// 			header: "Статус",
// 			cell: ({ row }) => {
// 				const statusValue = row.original.status?.toLowerCase() || "";
				
// 				const handleStatusChange = (value: string) => {
// 					if (value === "processing" || value === "completed") {
// 						updateStatus.mutate({
// 							id: row.original.id,
// 							status: value.toUpperCase() as "PROCESSING" | "COMPLETED",
// 						});
// 					}
// 				};
				
// 				const isProcessing = row.original.status !== "COMPLETED";
				
// 				return (
// 					<Select
// 						value={statusValue}
// 						onValueChange={handleStatusChange}
// 						disabled={updateStatus.isPending}
// 					>
// 						<SelectTrigger className={`w-32 ${updateStatus.isPending ? "opacity-50" : ""}`}>
// 							<SelectValue>
// 								{updateStatus.isPending ? "..." : isProcessing ? "В процессе" : "Завершено"}
// 							</SelectValue>
// 						</SelectTrigger>
// 						<SelectContent>
// 							<SelectItem value="processing">В процессе</SelectItem>
// 							<SelectItem value="completed">Завершено</SelectItem>
// 						</SelectContent>
// 					</Select>
// 				);
// 			},
// 		},
// 		{
// 			accessorKey: "createdAt",
// 			header: "Дата создания",
// 			cell: ({ row }) => {
// 				if (!row.original.createdAt) return <p>-</p>;
				
// 				try {
// 					const date = typeof row.original.createdAt === 'string' 
// 						? new Date(row.original.createdAt) 
// 						: row.original.createdAt;
// 					return <p>{format(date, "dd.MM.yyyy HH:mm")}</p>;
// 				} catch (error) {
// 					return <p>Неверная дата</p>;
// 				}
// 			},
// 		},
// 		{
// 			id: "actions",
// 			header: () => (
// 				<div className="w-full justify-end flex items-end">
// 					<Button variant="outline" size="sm">
// 						+ Добавить расчет
// 					</Button>
// 				</div>
// 			),
// 			cell: ({ row }) => (
// 				<div className="flex flex-row items-center justify-center space-x-2">
// 					<Button variant="outline" size="sm">Редактировать</Button>
// 					<Button variant="destructive" size="sm">Удалить</Button>
// 				</div>
// 			),
// 		},
// 	], [updateStatus]);

// 	return (
// 		<div className="p-4 lg:p-6">
// 			<h1 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">
// 				Заявки на расчет ({calculations?.length ?? 0})
// 			</h1>
// 			<DataTable columns={columns} data={calculations || initialData} />
// 		</div>
// 	);
// }