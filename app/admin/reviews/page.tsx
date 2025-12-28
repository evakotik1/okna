import { api } from "@/app/server/api";
import { ReviewsTable } from "./reviews-table";
import { ArrowLeft } from "lucide-react";

export default async function ReviewsPage() {
	const reviews = (await api.reviews.get()).data;

	console.log(reviews?.length);

	return (
		<div>
			<a href="/admin" className="flex gap-4 mb-6 md:mb-16 md:ml-4 mt-6 p-2  items-center hover:underline ">
                                <ArrowLeft />
                                <span>Вернуться назад</span>
                        </a>
			<ReviewsTable initialReviews={reviews ?? []} />
		</div>
	);
}
