// app/admin/page.tsx
"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Админ-панель</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">

        <Link 
          href="/admin/measurements" 
          className="block p-6 bg-orange-50 border-2 border-orange-200 rounded-xl "
        >
          <h2 className="text-xl font-semibold text-orange-800 mb-2">
            Заявки на замер
          </h2>

        </Link>


        <Link 
          href="/admin/calculation" 
          className="block p-6 bg-orange-50 border-2 border-orange-200 rounded-xl "
        >
          <h2 className="text-xl font-semibold text-orange-800 mb-2">
            Расчеты
          </h2>

        </Link>


        <Link 
          href="/admin/reviews" 
          className="block p-6 bg-orange-50 border-2 border-orange-200 rounded-xl "
        >
          <h2 className="text-xl font-semibold text-orange-800 mb-2">
            Отзывы
          </h2>

        </Link>


        <Link 
          href="/admin/questions" 
          className="block p-6 bg-orange-50 border-2 border-orange-200 rounded-xl "
        >
          <h2 className="text-xl font-semibold text-orange-800 mb-2">
          Вопросы
          </h2>

        </Link>
        
      </div>
    </div>
  );
}