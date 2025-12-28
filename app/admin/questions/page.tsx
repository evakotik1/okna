import { api } from "@/app/server/api";
import { QuestionsTable } from "./questions-table";
import { ArrowLeft } from "lucide-react";

export default async function QuestionsPage() {
        const questions = (await api.questions.get()).data;

        console.log(questions?.length);

        return (
                <div>
			<a href="/admin" className="flex gap-4 mb-6 md:mb-16 md:ml-4 mt-6 p-2  items-center hover:underline ">
                                <ArrowLeft />
                                <span>Вернуться назад</span>
                        </a>
                        <QuestionsTable initialquestions={questions ?? []} />
                </div>
        );
}