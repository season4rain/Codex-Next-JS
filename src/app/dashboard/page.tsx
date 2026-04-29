import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-zinc-100 px-6 py-10">
      <section className="mx-auto grid w-full max-w-4xl gap-6">
        <div className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-500">Signed in as</p>
            <h1 className="mt-1 text-2xl font-semibold text-zinc-950">
              {session.user.name}
            </h1>
            <p className="mt-1 text-sm text-zinc-600">{session.user.email}</p>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="h-10 rounded-md border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50"
            >
              Sign out
            </button>
          </form>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-950">Dashboard</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            This route is protected by Auth.js middleware and backed by Prisma
            with SQLite.
          </p>
        </div>
      </section>
    </main>
  );
}
