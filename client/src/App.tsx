import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Pricing from "@/pages/pricing";
import Signup from "@/pages/auth/signup";
import Login from "@/pages/auth/login";
import Payment from "@/pages/payment";

import Dashboard from "@/pages/dashboard";
import Templates from "@/pages/templates";
import Trainings from "@/pages/trainings";
import Reports from "@/pages/reports";
import Terms from "@/pages/terms";
import Blog from "@/pages/blog";
import Admin from "@/pages/admin";
import AdminLogin from "@/pages/admin-login";

import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

// Protected Route Component (requires auth + payment)
function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, hasPaid } = useAuth();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    } else if (!hasPaid) {
      setLocation("/payment");
    }
  }, [isAuthenticated, hasPaid, setLocation]);

  if (!isAuthenticated || !hasPaid) {
    return null; // Or a loading spinner
  }

  return <Component />;
}

// Admin Route Component (requires admin password)
function AdminRoute({ component: Component }: { component: React.ComponentType }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [_, setLocation] = useLocation();

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuthenticated");
    if (adminAuth === "true") {
      setIsAdminAuthenticated(true);
    } else {
      setLocation("/admin-login");
    }
    setIsLoading(false);
  }, [setLocation]);

  if (isLoading) {
    return null;
  }

  if (!isAdminAuthenticated) {
    return null;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      
      {/* Protected Routes */}
      <Route path="/dashboard">
        <ProtectedRoute component={Dashboard} />
      </Route>
      <Route path="/templates">
        <ProtectedRoute component={Templates} />
      </Route>
      <Route path="/trainings">
        <ProtectedRoute component={Trainings} />
      </Route>
      <Route path="/reports">
        <ProtectedRoute component={Reports} />
      </Route>
      <Route path="/admin">
        <AdminRoute component={Admin} />
      </Route>
      <Route path="/admin-login" component={AdminLogin} />

      <Route path="/about" component={About} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/terms" component={Terms} />
      <Route path="/blog" component={Blog} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/payment" component={Payment} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
