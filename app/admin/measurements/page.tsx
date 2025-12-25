import { api } from "@/app/server/api";
import { MeasurementsTable } from "./measurement-table";

export default async function MeasurementsPage() {
	const measurements = (await api.measurement.get()).data;

	console.log(measurements?.length);

	return (
		<div>
			<MeasurementsTable initialMeasurements={measurements ?? []} />
		</div>
	);
}
