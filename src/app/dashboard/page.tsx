import { auth, signOut } from "@/lib/auth";
import {
  Activity,
  ArrowUpRight,
  Database,
  LockKeyhole,
  LogOut,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const displayName = session.user.name ?? "Signed in user";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="min-h-screen bg-[#f6f7f4] px-5 py-6 text-zinc-950 sm:px-8">
      <section className="mx-auto grid w-full max-w-6xl gap-6">
        <header className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-md bg-[#12312b] text-sm font-semibold text-white">
              {initials}
            </span>
            <div>
              <p className="text-sm font-medium text-zinc-500">Signed in as</p>
              <h1 className="mt-1 text-2xl font-semibold text-zinc-950">
                {displayName}
              </h1>
              <p className="mt-1 text-sm text-zinc-600">
                {session.user.email}
              </p>
            </div>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-800 shadow-sm transition hover:border-zinc-400"
            >
              <LogOut aria-hidden="true" size={16} />
              Sign out
            </button>
          </form>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#2f6f56]">
                  Protected workspace
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-zinc-950">
                  Dashboard overview
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
                  This page verifies the complete authenticated path: middleware
                  protection, session lookup, server actions, and Prisma backed
                  identity data.
                </p>
              </div>
              <span className="inline-flex h-9 items-center gap-2 rounded-md bg-[#e7f2ed] px-3 text-sm font-medium text-[#245c48]">
                <ShieldCheck aria-hidden="true" size={16} />
                Active session
              </span>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: "Auth route",
                  value: "Ready",
                  icon: LockKeyhole,
                  tone: "bg-[#e7f2ed] text-[#245c48]",
                },
                {
                  label: "Database",
                  value: "SQLite",
                  icon: Database,
                  tone: "bg-[#e6f0ff] text-[#234f82]",
                },
                {
                  label: "User profile",
                  value: "Loaded",
                  icon: UserRound,
                  tone: "bg-[#fff1d7] text-[#815100]",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-lg border border-zinc-200 bg-[#fbfcf8] p-4"
                  >
                    <span
                      className={`grid size-9 place-items-center rounded-md ${item.tone}`}
                    >
                      <Icon aria-hidden="true" size={18} />
                    </span>
                    <p className="mt-5 text-sm font-medium text-zinc-500">
                      {item.label}
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-zinc-950">
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <aside className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-950">
                System checks
              </h2>
              <Activity aria-hidden="true" size={20} className="text-[#2f6f56]" />
            </div>
            <div className="mt-6 grid gap-3">
              {[
                "Session token accepted",
                "Protected route rendered",
                "Sign out server action available",
                "Prisma client connected",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between gap-3 rounded-md border border-zinc-200 px-4 py-3"
                >
                  <p className="text-sm font-medium text-zinc-700">{item}</p>
                  <ArrowUpRight
                    aria-hidden="true"
                    size={16}
                    className="shrink-0 text-zinc-400"
                  />
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
