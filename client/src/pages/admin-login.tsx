import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ShieldCheck, Lock } from "lucide-react";
import { toast } from "sonner";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [_, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate a small delay for better UX
    setTimeout(() => {
      if (username === "admin" && password === "Drintel@2025temp") {
        localStorage.setItem("adminAuthenticated", "true");
        localStorage.setItem("adminLoginTime", new Date().toISOString());
        toast.success("Admin login successful!");
        setLocation("/admin");
      } else {
        toast.error("Invalid username or password");
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4">
      <div className="mb-8 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-white">
          <ShieldCheck className="h-8 w-8" />
          <span className="text-2xl font-bold">DrIntel Admin</span>
        </div>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-slate-300">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
          <div className="flex gap-3 items-center">
            <Lock className="w-5 h-5 text-white" />
            <div>
              <p className="text-sm font-semibold text-white">Secure Admin Access</p>
              <p className="text-xs text-blue-100">Only authorized administrators can access this area</p>
            </div>
          </div>
        </div>

        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-700">Username</label>
              <Input
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                autoFocus
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full mt-4" disabled={isLoading} size="lg">
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col border-t bg-slate-50 p-4">
          <p className="text-xs text-slate-500 text-center w-full">
            🔒 This login area is protected. Unauthorized access attempts are logged.
          </p>
        </CardFooter>
      </Card>

      <div className="mt-8 text-center text-slate-400 text-xs">
        <p>DrIntel Admin Dashboard</p>
        <p>Secure. Protected. Professional.</p>
      </div>
    </div>
  );
}
