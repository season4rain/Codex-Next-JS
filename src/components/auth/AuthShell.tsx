import Link from "next/link";
import type { ReactNode } from "react";
import { Database, KeyRound, ShieldCheck } from "lucide-react";

type AuthShellProps = {
  children: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
};

export function AuthShell({
  children,
  eyebrow,
  title,
  description,
}: AuthShellProps) {
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
          <Link
            href="/"
            className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-zinc-400 hover:text-zinc-950"
          >
            Back home
          </Link>
        </header>

        <section className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-10">
          <div className="order-2 max-w-xl lg:order-1">
            <p className="text-sm font-semibold text-[#2f6f56]">{eyebrow}</p>
            <h1 className="mt-4 text-3xl font-semibold text-zinc-950 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-zinc-600">
              {description}
            </p>

            <div className="mt-10 hidden gap-3 sm:grid sm:grid-cols-3">
              {[
                {
                  icon: ShieldCheck,
                  label: "Protected routes",
                  tone: "bg-[#e7f2ed] text-[#245c48]",
                },
                {
                  icon: KeyRound,
                  label: "Credentials auth",
                  tone: "bg-[#fff1d7] text-[#815100]",
                },
                {
                  icon: Database,
                  label: "SQLite storage",
                  tone: "bg-[#e6f0ff] text-[#234f82]",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm"
                  >
                    <span
                      className={`mb-4 grid size-9 place-items-center rounded-md ${item.tone}`}
                    >
                      <Icon aria-hidden="true" size={18} />
                    </span>
                    <p className="text-sm font-medium text-zinc-900">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <section className="order-1 rounded-lg border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-200/60 sm:p-8 lg:order-2">
            {children}
          </section>
        </section>
      </div>
    </main>
  );
}
