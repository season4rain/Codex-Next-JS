import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <AuthShell
      eyebrow="Start securely"
      title="Create a clean foundation for authenticated features."
      description="Register a local account, store credentials safely, and move straight into a protected dashboard built for real app workflows."
    >
      <div className="mb-8">
        <p className="text-sm font-medium text-[#2f6f56]">New account</p>
        <h2 className="mt-2 text-2xl font-semibold text-zinc-950">
          Create account
        </h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Register with your name, email, and a secure password.
        </p>
      </div>
        <RegisterForm />
    </AuthShell>
  );
}
