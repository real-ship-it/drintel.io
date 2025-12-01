import { useAuth } from "@/context/AuthContext";
import { Navbar, Footer } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, CreditCard, Lock } from "lucide-react";
import { useState } from "react";

export default function Payment() {
  const { completePayment, user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate Stripe processing delay
    setTimeout(() => {
      setIsProcessing(false);
      completePayment();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-primary font-bold text-2xl">
            <ShieldCheck className="h-8 w-8" />
            <span>DrIntel</span>
          </div>
        </div>

        <Card className="w-full max-w-lg shadow-xl border-slate-200 overflow-hidden">
          <div className="bg-slate-900 p-6 text-white text-center">
            <h2 className="text-xl font-bold mb-2">Complete Your Subscription</h2>
            <p className="text-slate-300 text-sm">Unlock full access to templates, trainings, and reports.</p>
            <div className="mt-4 text-3xl font-bold">$149<span className="text-sm font-normal text-slate-400">/month</span></div>
          </div>
          
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-2 text-sm text-slate-600 bg-blue-50 p-3 rounded-md border border-blue-100">
              <Lock className="w-4 h-4 text-blue-600" />
              Secure payment for <strong>{user?.email || "your account"}</strong>
            </div>

            <form onSubmit={handlePayment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card">Card Number</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input id="card" placeholder="0000 0000 0000 0000" className="pl-10" required />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Cardholder Name</Label>
                <Input id="name" placeholder="Dr. Jane Smith" required />
              </div>

              <Button type="submit" className="w-full h-12 text-lg mt-6 bg-teal-600 hover:bg-teal-700" disabled={isProcessing}>
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Processing...
                  </span>
                ) : (
                  "Pay Securely"
                )}
              </Button>
            </form>
            
            <div className="flex justify-center gap-4 opacity-50 grayscale">
               {/* Mock payment icons */}
               <div className="font-bold text-slate-600 italic">VISA</div>
               <div className="font-bold text-slate-600 italic">MasterCard</div>
               <div className="font-bold text-slate-600 italic">AMEX</div>
            </div>
          </CardContent>
        </Card>
        
        <p className="mt-6 text-xs text-center text-slate-400 max-w-md">
          By confirming your subscription, you allow DrIntel to charge your card for this payment and future payments in accordance with our terms.
        </p>
      </div>
      <Footer />
    </div>
  );
}
