import { api } from "@/app/server/api";
import { CalculationsTable } from "./calculation-table";
import { ArrowLeft } from "lucide-react";

export default async function CalculationssPage() {
	const calculations = (await api.calculation.get()).data;

	console.log(calculations?.length);

	return (
		<div>
			<a href="/admin" className="flex gap-4 mb-6 md:mb-16 md:ml-4 mt-6 p-2  items-center hover:underline ">
                                <ArrowLeft />
                                <span>Вернуться назад</span>
                        </a>
			<CalculationsTable initialcalculations={calculations ?? []} />
		</div>
	);
}
