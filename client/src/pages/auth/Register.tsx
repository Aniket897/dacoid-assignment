import { lazy, Suspense } from "react";

const RegisterForm = lazy(() => import("@/components/forms/RegisterForm"));

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Suspense fallback="Loading...">
        <RegisterForm />
      </Suspense>
    </div>
  );
}
