"use client";

import { useQuery, useMutation } from "@tanstack/react-query";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/app/lib/client/api";

type Measurement = {
  id: string;
  name: string;
  phone: string;
  email: string;
  consent: boolean;
  status: "processing" | "completed";
};

export function MeasurementsTable({ initialMeasurements }: { initialMeasurements: Measurement[] }) {
  const { data: measurements } = useQuery({
    queryKey: ["measurements"],
    queryFn: async () => {
      const res = await api.measurement.get();
      const data = res.data ?? [];
      return data.map((measurement: any) => ({
        id: measurement.id,
        name: measurement.name,
        phone: measurement.phone,
        email: measurement.email,
        consent: measurement.consent,
        status: (measurement.status === "processing" || measurement.status === "completed" 
          ? measurement.status 
          : "processing") as "processing" | "completed",
      }));
    },
    initialData: initialMeasurements,
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await api.measurement({ id }).put({ status });
      return res.data;
    },
  });

  return (
    <div className="p-4 lg:p-6 text-black">
      <h1 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">
        Заявки на замер ({measurements.length})
      </h1>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-black">Имя</TableHead>
              <TableHead className="text-black">Email</TableHead>
              <TableHead className="text-black">Телефон</TableHead>
              <TableHead className="text-black">Согласие</TableHead>
              <TableHead className="text-black">Статус</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {measurements.map((measurement) => (
              <TableRow key={measurement.id}>
                <TableCell className="font-medium">
                  <div>{measurement.name}</div>
                  <div className="text-sm text-muted-foreground lg:hidden">
                    {measurement.email}
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <a href={`mailto:${measurement.email}`} className="text-blue-600 hover:underline">
                    {measurement.email}
                  </a>
                </TableCell>
                <TableCell>
                  <a href={`tel:${measurement.phone}`} className="text-blue-600 hover:underline">
                    {measurement.phone}
                  </a>
                </TableCell>
                <TableCell>
                  {measurement.consent ? "✅ Да" : "❌ Нет"}
                </TableCell>
                <TableCell>
                  <Select
                    value={measurement.status} 
                    onValueChange={(value) => updateStatus.mutate({ 
                      id: measurement.id, 
                      status: value 
                    })}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="processing">В обработке</SelectItem>
                      <SelectItem value="completed">Завершено</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}