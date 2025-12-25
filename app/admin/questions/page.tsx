// app/admin/questions/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/app/lib/client/api";

interface QuestionItem {
  id: string;
  name: string;
  email: string;
  message: string;
  consent: boolean;
  status?: "new" | "read" | null;
  deletedAt?: Date | null;
  createdAt: Date | string;
  updatedAt?: Date;
}

interface ApiQuestionItem {
  id: string;
  name: string;
  email: string;
  message: string;
  consent: boolean;
  status?: string | null;
  deletedAt?: Date | null;
  createdAt: Date | string;
  updatedAt?: Date;
}

export default function QuestionsPage() {
  const [items, setItems] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const res = await api.questions.admin.get();
      if (res.data) {
        const typedData: QuestionItem[] = res.data.map((item: ApiQuestionItem) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          message: item.message,
          consent: item.consent,
          status: item.status === "read" ? "read" : "new",
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

  const updateStatus = useCallback(async (id: string, newStatus: "new" | "read") => {
    const item = items.find(x => x.id === id);
    if (!item) return;

    try {
      await api.questions.admin({ id }).put({
        name: item.name,
        email: item.email,
        message: item.message,
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
      <h1 className="text-2xl font-bold mb-4">Вопросы клиентов ({items.length})</h1>
      
      <button 
        onClick={loadData}
        className="mb-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
      >
        Обновить список
      </button>

      {items.length === 0 ? (
        <p>Нет вопросов</p>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="border p-3 rounded bg-white">
              <div className="font-bold">{item.name}</div>
              <div className="text-gray-600"> {item.email}</div>
              <div className="mt-2 p-2 bg-gray-50 rounded border">
                <p className="text-gray-700">{item.message}</p>
              </div>
              
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => updateStatus(item.id, "new")}
                  className={`px-3 py-1 rounded text-sm ${
                    (item.status || "new") === "new" 
                      ? "bg-orange-500 text-white" 
                      : "bg-gray-200"
                  }`}
                >
                  Новый
                </button>
                
                <button
                  onClick={() => updateStatus(item.id, "read")}
                  className={`px-3 py-1 rounded text-sm ${
                    item.status === "read" 
                      ? "bg-gray-500 text-white" 
                      : "bg-gray-200"
                  }`}
                >
                  Прочитано
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