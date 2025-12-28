import { api } from "@/app/server/api";
import { MeasurementsTable } from "./measurement-table";
import { ArrowLeft } from 'lucide-react';

export default async function MeasurementsPage() {
        const measurements = (await api.measurement.get()).data;

        console.log(measurements?.length);

        return (
                <div>
			<a href="/admin" className="flex gap-4 mb-6 md:mb-16 md:ml-4 mt-6 p-2  items-center hover:underline ">
                                <ArrowLeft />
                                <span>Вернуться назад</span>
                        </a>
                        <MeasurementsTable initialMeasurements={measurements ?? []} />
                </div>
        );
}