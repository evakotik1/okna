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
import { Reviews } from "@/app/lib/shared/types/review";
import CreateUpdateReview from "./create-update";

function DeleteReview({ id }: { id: string }) {
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await api.reviews({ id }).delete();
      if (res.error) throw res.error;
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
      toast.success("Отзыв удален");
    },
    onError: () => {
      toast.error("Ошибка при удалении отзыва");
    },
  });

  const handleDelete = () => {
    if (confirm("Удалить отзыв? Это действие нельзя отменить.")) {
      deleteMutation.mutate();
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 border border-red-500"
      onClick={handleDelete}
      disabled={deleteMutation.isPending}
    >
      <Trash2 className="h-4 w-4" stroke="#ef4444"/>
    </Button>
  );
}

export function ReviewsTable({
  initialReviews: initialData,
}: {
  initialReviews: Reviews[] | null;
}) {
  const { data: reviewsData } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      try {
        const res = await api.reviews.get();
        return Array.isArray(res.data) ? res.data : [];
      } catch (error) {
        console.error("Error fetching reviews:", error);
        return [];
      }
    },
    initialData: Array.isArray(initialData) ? initialData : [],
  });

  const reviews = Array.isArray(reviewsData) ? reviewsData : [];

  const updateStatus = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: "PROCESSING" | "COMPLETED";
    }) => {
      const res = await api.reviews.status({ id }).put({ status });
      if (res.error) throw res.error;
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
      toast.success("Статус обновлен");
    },
    onError: () => {
      toast.error("Ошибка при обновлении статуса");
    },
  });

  const columns: ColumnDef<Reviews>[] = [
    {
      accessorKey: "name",
      header: "Имя",
      cell: ({ row }) => <p>{row.original.name}</p>,
    },
    {
      accessorKey: "contractNumber",
      header: "Номер договора",
      cell: ({ row }) => <p>{row.original.contractNumber}</p>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <a href={`mailto:${row.original.email}`}>
          {row.original.email}
        </a>
      ),
    },
    {
      accessorKey: "review",
      header: "Отзыв",
      cell: ({ row }) => (
        <div className="max-w-xs truncate" title={row.original.review}>
          {row.original.review}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Дата",
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
                <SelectValue>
                  {currentStatus === "PROCESSING" ? "Новый" : "Прочитано"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PROCESSING">Новый</SelectItem>
                <SelectItem value="COMPLETED">Прочитано</SelectItem>
              </SelectContent>
            </Select>
          );
        },
      },
    {
      id: "actions",
      header: () => (
        <div className="w-full justify-end flex items-end">
          <CreateUpdateReview />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex flex-row items-center justify-center space-x-2">
          <CreateUpdateReview reviews={row.original} />
          <DeleteReview id={row.original.id} />
        </div>
      ),
    },
  ];

  if (reviews.length === 0) {
    return (
      <div className="p-4 lg:p-6 text-black">
        <h1 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">
          Отзывы ({reviews.length})
        </h1>
        <div className="text-center py-8 text-muted-foreground">
          Нет отзывов
        </div>
      </div>
    );
  }

  return  (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">

      <div className="p-4 lg:p-6 border-b border-gray-300 bg-gray-50">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Отзывы ({reviews.length})
        </h1>
      </div>
      
      <div >
        <div className="min-w-[700px] md:min-w-0 p-4">
          <DataTable 
            columns={columns} 
            data={reviews}
          />
        </div>
      </div>
    </div>
  );
}