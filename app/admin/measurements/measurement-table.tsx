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
			status: "processing" | "completed";
		}) => {
			const res = await api.measurement.status({ id }).put({ status });
			return res.data;
		},
	});

	return (
		// <div className="p-4 lg:p-6 text-black">
		// 	<h1 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">
		// 		Заявки на замер ({measurements?.length ?? 0})
		// 	</h1>

		// 	<div className="rounded-md border">
		// 		<Table>
		// 			<TableHeader>
		// 				<TableRow>
		// 					<TableHead className="text-black">Имя</TableHead>
		// 					<TableHead className="text-black">Email</TableHead>
		// 					<TableHead className="text-black">Телефон</TableHead>
		// 					<TableHead className="text-black">Согласие</TableHead>
		// 					<TableHead className="text-black">Статус</TableHead>
		// 				</TableRow>
		// 			</TableHeader>
		// 			<TableBody>
		// 				{measurements.map((measurement) => (
		// 					<TableRow key={measurement.id}>
		// 						<TableCell className="font-medium">
		// 							<div>{measurement.name}</div>
		// 							<div className="text-sm text-muted-foreground lg:hidden">
		// 								{measurement.email}
		// 							</div>
		// 						</TableCell>
		// 						<TableCell className="hidden lg:table-cell">
		// 							<a
		// 								href={`mailto:${measurement.email}`}
		// 								className="text-blue-600 hover:underline"
		// 							>
		// 								{measurement.email}
		// 							</a>
		// 						</TableCell>
		// 						<TableCell>
		// 							<a
		// 								href={`tel:${measurement.phone}`}
		// 								className="text-blue-600 hover:underline"
		// 							>
		// 								{measurement.phone}
		// 							</a>
		// 						</TableCell>
		// 						<TableCell>
		// 							{measurement.consent ? "✅ Да" : "❌ Нет"}
		// 						</TableCell>
		// 						<TableCell>
		// 							<Select
		// 								value={measurement.status}
		// 								onValueChange={(value) =>
		// 									updateStatus.mutate({
		// 										id: measurement.id,
		// 										status: value,
		// 									})
		// 								}
		// 							>
		// 								<SelectTrigger className="w-32">
		// 									<SelectValue />
		// 								</SelectTrigger>
		// 								<SelectContent>
		// 									<SelectItem value="processing">В обработке</SelectItem>
		// 									<SelectItem value="completed">Завершено</SelectItem>
		// 								</SelectContent>
		// 							</Select>
		// 						</TableCell>
		// 					</TableRow>
		// 				))}
		// 			</TableBody>
		// 		</Table>
		// 	</div>
		// </div>
		<DataTable columns={columns} data={initialData} />
	);
}

export const columns: ColumnDef<Measurement>[] = [
	{
		accessorKey: "name",
		header: "Имя",
		cell: ({ row }) => <p>{row.original.name}</p>,
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
				{/* <DeletePartner id={row.original.id} /> */}
			</div>
		),
	},
];
