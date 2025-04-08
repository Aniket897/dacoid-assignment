import { lazy, Suspense } from "react";

const LoginForm = lazy(() => import("@/components/forms/LoginForm"));

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Suspense fallback="Loading...">
        <LoginForm />
      </Suspense>
    </div>
  );
}
