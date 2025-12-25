
import { api } from "@/app/lib/client/api";
import { MeasurementsTable } from "./measurement-table";

export default async function MeasurementsPage() {
    const measurements = (await api.measurement.get()).data;

    return (
        <MeasurementsTable initialMeasurements={measurements ?? []} />
    )
}