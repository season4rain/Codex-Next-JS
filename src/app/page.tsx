import Link from "next/link";
import { auth } from "@/lib/auth";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

export default async function Home() {
  const session = await auth();

  return (
    <main className="min-h-screen bg-[#f6f7f4] px-5 py-6 text-zinc-950 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col">
        <header className="flex items-center justify-between py-2">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-md bg-[#12312b] text-sm font-semibold text-white">
              AS
            </span>
            <span className="text-sm font-semibold text-zinc-900">
              Auth Starter
            </span>
          </Link>
          <nav className="flex items-center gap-2">
            {session?.user ? (
              <Link
                href="/dashboard"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#12312b] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1b453c]"
              >
                Dashboard
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden h-10 items-center justify-center rounded-md px-4 text-sm font-semibold text-zinc-700 transition hover:text-zinc-950 sm:inline-flex"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-[#12312b] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1b453c]"
                >
                  Create account
                </Link>
              </>
            )}
          </nav>
        </header>

        <section className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-[#cfe5da] bg-white px-3 py-2 text-sm font-medium text-[#245c48] shadow-sm">
              <ShieldCheck aria-hidden="true" size={16} />
              NextAuth, Prisma, SQLite
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold text-zinc-950 sm:text-6xl">
              A polished authentication starter for serious app work.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
              Register local users, sign in with credentials, and protect
              private routes with a clean foundation that is ready for product
              features.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {session?.user ? (
                <Link
                  href="/dashboard"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#12312b] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1b453c]"
                >
                  Open dashboard
                  <ArrowRight aria-hidden="true" size={17} />
                </Link>
              ) : (
                <>
                  <Link
                    href="/register"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#12312b] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1b453c]"
                  >
                    Start now
                    <ArrowRight aria-hidden="true" size={17} />
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex h-12 items-center justify-center rounded-md border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-900 shadow-sm transition hover:border-zinc-400"
                  >
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-xl shadow-zinc-200/70">
            <div className="rounded-md border border-zinc-200 bg-[#fbfcf8] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-zinc-500">
                    Authentication status
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold text-zinc-950">
                    {session?.user ? "Session active" : "Ready to configure"}
                  </h2>
                </div>
                <span className="grid size-11 place-items-center rounded-md bg-[#e7f2ed] text-[#245c48]">
                  <LockKeyhole aria-hidden="true" size={21} />
                </span>
              </div>

              <div className="mt-6 grid gap-3">
                {[
                  "Credentials provider wired through Auth.js",
                  "Passwords hashed before persistence",
                  "Dashboard protected at the middleware layer",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-md border border-zinc-200 bg-white px-4 py-3"
                  >
                    <CheckCircle2
                      aria-hidden="true"
                      size={18}
                      className="mt-0.5 shrink-0 text-[#2f6f56]"
                    />
                    <p className="text-sm leading-6 text-zinc-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-zinc-200 bg-white p-4">
                <Database
                  aria-hidden="true"
                  size={20}
                  className="text-[#234f82]"
                />
                <p className="mt-4 text-sm font-medium text-zinc-500">
                  Database
                </p>
                <p className="mt-1 text-xl font-semibold text-zinc-950">
                  SQLite
                </p>
              </div>
              <div className="rounded-md border border-zinc-200 bg-white p-4">
                <ShieldCheck
                  aria-hidden="true"
                  size={20}
                  className="text-[#245c48]"
                />
                <p className="mt-4 text-sm font-medium text-zinc-500">
                  Protection
                </p>
                <p className="mt-1 text-xl font-semibold text-zinc-950">
                  Middleware
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
