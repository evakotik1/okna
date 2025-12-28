"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/app/lib/client/api";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/app/components/ui/data-table";
import { queryClient } from "@/lib/query-client";
import { toast } from "sonner";
import {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
} from "@/app/components/ui/select";
import { Button } from "@/app/components/ui/button";
import { Trash2 } from "lucide-react";
import { Calculation } from "@/app/lib/shared/types/calculation";
import CreateUpdateCalculation from "./create-update";


function Deletecalculation({ id }: { id: string }) {
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await api.calculation({ id }).delete();
      if (res.error) throw res.error;
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["calculations"],
      });
      toast.success("Заявка удалена");
    },
    onError: () => {
      toast.error("Ошибка при удалении заявки");
    },
  });

  const handleDelete = () => {
    if (confirm("Точно хотите удалить заявку? Это действие нельзя отменить.")) {
      deleteMutation.mutate();
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8  border border-red-500"
      onClick={handleDelete}
      disabled={deleteMutation.isPending}
    >
      <Trash2 className="h-4 w-4 " stroke="#ef4444"/>
    </Button>
  );
}

export function CalculationsTable({
  initialcalculations: initialData,
}: {
  initialcalculations: Calculation[] | null;
}) {

  const { data: calculationsData } = useQuery({
    queryKey: ["calculations"],
    queryFn: async () => {
      try {
        const res = await api.calculation.get();
        return Array.isArray(res.data) ? res.data : [];
      } catch (error) {
        console.error("Error fetching calculations:", error);
        return [];
      }
    },
    initialData: Array.isArray(initialData) ? initialData : [],
  });

  const calculations = Array.isArray(calculationsData) ? calculationsData : [];

  const updateStatus = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: "PROCESSING" | "COMPLETED";
    }) => {
      const res = await api.calculation.status({ id }).put({ status });
      if (res.error) throw res.error;
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["calculations"],
      });
      toast.success("Статус обновлен");
    },
    onError: () => {
      toast.error("Ошибка при обновлении статуса");
    },
  });

  const columns: ColumnDef<Calculation>[] = [
    {
      accessorKey: "name",
      header: "Имя",
      cell: ({ row }) => <p>{row.original.name}</p>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <a href={`mailto:${row.original.email}`} >
          {row.original.email}
        </a>
      ),
    },
    {
      accessorKey: "phone",
      header: "Телефон",
      cell: ({ row }) => (
        <a href={`tel:${row.original.phone}`} className="text-blue-600 hover:underline" >
          {row.original.phone}
        </a>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Дата создания",
      cell: ({ row }) => (
        <p>{format(row.original.createdAt, "dd.MM.yyyy HH:mm")}</p>
      ),
    },
    {
      accessorKey: "consent",
      header: "Согласие",
      cell: ({ row }) => (
        <span>{row.original.consent ? "Да" : "Нет"}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Статус",
      cell: ({ row }) => {
        const currentStatus = row.original.status || "PROCESSING";
        
        return (
          <Select
            value={currentStatus}
            onValueChange={(value: "PROCESSING" | "COMPLETED") =>
              updateStatus.mutate({
                id: row.original.id,
                status: value,
              })
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PROCESSING">В процессе</SelectItem>
              <SelectItem value="COMPLETED">Завершен</SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      id: "actions",
      header: () => (
        <div className="w-full justify-end flex items-end">
          <CreateUpdateCalculation />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex flex-row items-center justify-center space-x-2">
          <CreateUpdateCalculation calculation={row.original} />
          <Deletecalculation id={row.original.id} />
        </div>
      ),
    },
  ];

  if (calculations.length === 0) {
    return (
      <div className="p-4 lg:p-6 text-black">
        <h1 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">
          Заявки на замер (0)
        </h1>
        <div className="text-center py-8 text-muted-foreground">
          Нет заявок
        </div>
      </div>
    );
  }

  return  (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">

      <div className="p-4 lg:p-6 border-b border-gray-300 bg-gray-50">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Заявки на расчеты ({calculations.length})
        </h1>
      </div>
      
      <div >
        <div className="min-w-[700px] md:min-w-0 p-4">
          <DataTable 
            columns={columns} 
            data={calculations}
          />
        </div>
      </div>
    </div>
  );
}