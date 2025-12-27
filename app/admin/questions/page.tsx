import { api } from "@/app/server/api";
import { QuestionsTable } from "./questions-table";

export default async function QuestionsPage() {
        const questions = (await api.questions.get()).data;

        console.log(questions?.length);

        return (
                <div>
                        <QuestionsTable initialquestions={questions ?? []} />
                </div>
        );
}