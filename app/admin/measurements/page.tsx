"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/app/lib/client/api";

interface MeasurementItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  consent: boolean;
  status?: "processing" | "completed" | null;
  deletedAt?: Date | null;
  createdAt: Date | string;
  updatedAt?: Date;
}


interface ApiMeasurementItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  consent: boolean;
  status?: string | null;
  deletedAt?: Date | null;
  createdAt: Date | string;
  updatedAt?: Date;
}

export default function Page() {
  const [items, setItems] = useState<MeasurementItem[]>([]);
  const [loading, setLoading] = useState(true);


  const loadData = useCallback(async () => {
    try {
      const res = await api.measurement.admin.get();
      if (res.data) {

        const typedData: MeasurementItem[] = res.data.map((item: ApiMeasurementItem) => ({
          id: item.id,
          name: item.name,
          phone: item.phone,
          email: item.email,
          consent: item.consent,

          status: item.status === "completed" ? "completed" : "processing",
          deletedAt: item.deletedAt,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        }));
        setItems(typedData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {

    const load = async () => {
      await loadData();
    };
    load();
  }, [loadData]);

  const updateStatus = useCallback(async (id: string, newStatus: "processing" | "completed") => {
    const item = items.find(x => x.id === id);
    if (!item) return;

    try {
      await api.measurement.admin({ id }).put({
        name: item.name,
        phone: item.phone,
        email: item.email,
        consent: item.consent,
        status: newStatus
      });

      setItems(prevItems => 
        prevItems.map(x => 
          x.id === id ? { ...x, status: newStatus } : x
        )
      );
    } catch (error) {
      console.log(error);
    }
  }, [items]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Заявки на замер ({items.length})</h1>
      
      <button 
        onClick={loadData}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Обновить список
      </button>

      {items.length === 0 ? (
        <p>Нет заявок</p>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="border p-3 rounded bg-white">
              <div className="font-bold">{item.name}</div>
              <div className="text-gray-600 flex gap-4">  {item.phone}</div>
              <div className="text-gray-600 flex gap-4">  {item.email}</div>
              
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => updateStatus(item.id, "processing")}
                  className={`px-3 py-1 rounded text-sm ${
                    (item.status || "processing") === "processing" 
                      ? "bg-yellow-500 text-white" 
                      : "bg-gray-200"
                  }`}
                >
                  В процессе
                </button>
                
                <button
                  onClick={() => updateStatus(item.id, "completed")}
                  className={`px-3 py-1 rounded text-sm ${
                    item.status === "completed" 
                      ? "bg-green-500 text-white" 
                      : "bg-gray-200"
                  }`}
                >
                  Завершено
                </button>
              </div>
              
              <div className="text-xs text-gray-500 mt-1">
                {new Date(item.createdAt).toLocaleDateString("ru-RU")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}