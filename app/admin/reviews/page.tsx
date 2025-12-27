import { api } from "@/app/server/api";
import { ReviewsTable } from "./reviews-table";

export default async function ReviewsPage() {
	const reviews = (await api.reviews.get()).data;

	console.log(reviews?.length);

	return (
		<div>
			<ReviewsTable initialReviews={reviews ?? []} />
		</div>
	);
}
