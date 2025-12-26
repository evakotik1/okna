"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/app/components/ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/app/components/ui/select";
import { api } from "@/app/lib/client/api";
import { Measurement } from "@/app/lib/shared/types/measurements";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import CreateUpdateMeasurement from "./create-update";
import { DataTable } from "@/app/components/ui/data-table";
import { Button } from "@/app/components/ui/button";
import { useState, useMemo } from "react";

export function MeasurementsTable({
	initialMeasurements: initialData,
}: {
	initialMeasurements: Measurement[];
}) {
	const { data: measurements } = useQuery({
		queryKey: ["measurements"],
		queryFn: async () => {
			return (await api.measurement.get()).data;
		},
		initialData,
	});

	const updateStatus = useMutation({
		mutationFn: async ({
			id,
			status,
		}: {
			id: string;
			status: "PROCESSING" | "COMPLETED";
		}) => {
			const res = await api.measurement.status({ id }).put({ status });
			return res.data;
		},
	});

	const columns: ColumnDef<Measurement>[] = useMemo(() => [
		{
			accessorKey: "name",
			header: "Имя",
			cell: ({ row }) => <p>{row.original.name}</p>,
		},
		{
			accessorKey: "email",
			header: "Email",
			cell: ({ row }) => (
				<p>
					{row.original.email}
				</p>
			),
		},
		{
			accessorKey: "phone",
			header: "Телефон",
			cell: ({ row }) => (
				<a 
					href={`tel:${row.original.phone}`}
					className="text-blue-600 hover:underline"
				>
					{row.original.phone}
				</a>
			),
		},
		{
			accessorKey: "consent",
			header: "Согласие",
			cell: ({ row }) => (
				<p className={row.original.consent ? "text-green-600" : "text-red-600"}>
					{row.original.consent ? "Да" : "Нет"}
				</p>
			),
		},
		{
			accessorKey: "status",
			header: "Статус",
			cell: ({ row }) => {
				const statusValue = row.original.status?.toLowerCase() || "";
				
				const handleStatusChange = (value: string) => {
					if (value === "processing" || value === "completed") {
						updateStatus.mutate({
							id: row.original.id,
							status: value.toUpperCase() as "PROCESSING" | "COMPLETED",
						});
					}
				};
				
				const isProcessing = row.original.status !== "COMPLETED";
				
				return (
					<Select
						value={statusValue}
						onValueChange={handleStatusChange}
						disabled={updateStatus.isPending}
					>
						<SelectTrigger className={`w-32 ${updateStatus.isPending ? "opacity-50" : ""}`}>
							<SelectValue>
								{updateStatus.isPending ? "..." : isProcessing ? "В процессе" : "Завершено"}
							</SelectValue>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="processing">В процессе</SelectItem>
							<SelectItem value="completed">Завершено</SelectItem>
						</SelectContent>
					</Select>
				);
			},
		},
		{
			accessorKey: "createdAt",
			header: "Дата создания",
			cell: ({ row }) => (
				<p>{format(row.original.createdAt, "dd.MM.yyyy HH:mm")}</p>
			),
		},
		{
			id: "actions",
			header: () => (
				<div className="w-full justify-end flex items-end">
					<CreateUpdateMeasurement />
				</div>
			),
			cell: ({ row }) => (
				<div className="flex flex-row items-center justify-center space-x-2">
					<CreateUpdateMeasurement measurement={row.original} />
				</div>
			),
		},
	], [updateStatus]);

	return (
		<div className="p-4 lg:p-6">
			<h1 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">
				Заявки на замер ({measurements?.length ?? 0})
			</h1>
			<DataTable columns={columns} data={measurements || initialData} />
		</div>
	);
}
