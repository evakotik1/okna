import { headers } from "next/headers";
import { auth } from "../server/auth/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session?.user.role !== "admin") {
		redirect("/");
	}

	return <div className="flex flex-col gap-4 p-4">{children}</div>;
}
