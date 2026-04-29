import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to manage your private workspace."
      description="A focused authentication starter with local credentials, secure password hashing, and Prisma backed persistence."
    >
      <div className="mb-8">
        <p className="text-sm font-medium text-[#2f6f56]">Account access</p>
        <h2 className="mt-2 text-2xl font-semibold text-zinc-950">Sign in</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Use your registered email and password to continue.
        </p>
      </div>
        <Suspense>
          <LoginForm />
        </Suspense>
    </AuthShell>
  );
}
