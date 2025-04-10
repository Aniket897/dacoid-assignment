import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Dashboard from "@/pages/dashboard";
import ProtectRoutes from "@/components/ProtectRoutes";
import { useAuth } from "./hooks/useAuth";
import Redirect from "./components/Redirect";
import Analytics from "./pages/dashboard/Analytics";
import { Loader } from "lucide-react";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col gap-3">
        <Loader className="animate-spin" />
        <p>Loading..</p>
      </div>
    );
  }

  return (
    <>
      <Toaster richColors closeButton />
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Home />} />

        {/* Auth routes */}
        <Route element={<ProtectRoutes type="auth" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Private Routes */}
        <Route element={<ProtectRoutes type="dashboard" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/:id/analytics" element={<Analytics />} />
        </Route>

        {/* Rediect Route */}
        <Route path="/:id" element={<Redirect />} />
      </Routes>
    </>
  );
}

export default App;
