import { RegisterForm } from "@/components/auth/RegisterForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-6 py-12">
      <section className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="mb-8 grid gap-2 text-center">
          <h1 className="text-2xl font-semibold text-zinc-950">
            Create account
          </h1>
          <p className="text-sm text-zinc-600">
            Register with an email and password.
          </p>
        </div>
        <RegisterForm />
      </section>
    </main>
  );
}
