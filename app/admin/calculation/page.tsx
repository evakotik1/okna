import { api } from "@/app/server/api";
import { CalculationsTable } from "./calculation-table";

export default async function CalculationssPage() {
	const calculations = (await api.calculation.get()).data;

	console.log(calculations?.length);

	return (
		<div>
			<CalculationsTable initialcalculations={calculations ?? []} />
		</div>
	);
}
