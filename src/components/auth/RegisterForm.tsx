"use client";

import { signIn } from "next-auth/react";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      setError(payload?.error ?? "Could not create your account.");
      setIsSubmitting(false);
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    setIsSubmitting(false);

    if (result?.error) {
      router.push("/login");
      return;
    }

    router.push(result?.url ?? "/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-2">
        <label className="text-sm font-medium text-zinc-800" htmlFor="name">
          Name
        </label>
        <div className="relative">
          <User
            aria-hidden="true"
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            className="h-12 w-full rounded-md border border-zinc-300 bg-white pl-10 pr-3 text-base text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#2f6f56] focus:ring-4 focus:ring-[#dcece5]"
            placeholder="Your name"
          />
        </div>
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium text-zinc-800" htmlFor="email">
          Email
        </label>
        <div className="relative">
          <Mail
            aria-hidden="true"
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="h-12 w-full rounded-md border border-zinc-300 bg-white pl-10 pr-3 text-base text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#2f6f56] focus:ring-4 focus:ring-[#dcece5]"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium text-zinc-800" htmlFor="password">
          Password
        </label>
        <div className="relative">
          <Lock
            aria-hidden="true"
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className="h-12 w-full rounded-md border border-zinc-300 bg-white pl-10 pr-3 text-base text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#2f6f56] focus:ring-4 focus:ring-[#dcece5]"
            placeholder="At least 8 characters"
          />
        </div>
      </div>
      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#12312b] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1b453c] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
        <ArrowRight aria-hidden="true" size={17} />
      </button>
      <p className="text-center text-sm text-zinc-600">
        Already have an account?{" "}
        <Link className="font-semibold text-[#245c48]" href="/login">
          Sign in
        </Link>
      </p>
    </form>
  );
}
