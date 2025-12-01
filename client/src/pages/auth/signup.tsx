import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck, ArrowLeft, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";

const signupSchema = z.object({
  fullName: z.string().min(2, "Name is required").max(100, "Name too long"),
  email: z.string().email("Invalid email address").max(255, "Email too long"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*]/, "Password must contain at least one special character (!@#$%^&*)"),
  specialty: z.string().min(1, "Please select a specialty"),
  officeManagerEmail: z.string().email("Invalid email").optional().or(z.literal("")),
});

export default function Signup() {
  const { login } = useAuth();
  const [_, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      specialty: "",
      officeManagerEmail: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    // Security: Sanitize inputs to prevent XSS
    const sanitizedEmail = values.email.trim().toLowerCase();
    const sanitizedName = values.fullName.trim().replace(/<[^>]*>/g, '');
    
    // Mock signup - only proceed if email looks valid
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      return;
    }
    
    setIsLoading(true);
    try {
      // Save new user to Supabase as suspended
      const { error } = await supabase.from("users").insert([{
        email: sanitizedEmail,
        name: sanitizedName,
        role: "doctor",
        status: "suspended",
        verified_email: false,
        specialty: values.specialty,
        office_manager_email: values.officeManagerEmail || null,
      }]);
      
      if (error) throw error;
      
      setSignupSuccess(true);
      toast.success("Account created! Awaiting admin approval...");
      
      // Redirect to login after showing success message
      setTimeout(() => {
        setLocation("/login");
      }, 2000);
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="mb-8 flex flex-col items-center gap-2">
        <Link href="/">
          <a className="flex items-center gap-2 text-primary font-bold text-2xl">
            <ShieldCheck className="h-8 w-8" />
            <span>DrIntel</span>
          </a>
        </Link>
      </div>

      <Card className="w-full max-w-md shadow-xl border-slate-200">
        {/* Signup Success Message */}
        {signupSuccess && (
          <div className="bg-green-50 border-b border-green-200 px-6 py-4">
            <div className="flex gap-3">
              <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-green-900 mb-1">Account Created!</p>
                <p className="text-xs text-green-800">Your account is pending admin approval. Check your email for verification details. You'll be redirected to login...</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Security: HIPAA Compliance Notice */}
        {!signupSuccess && (
          <div className="bg-blue-50 border-b border-blue-200 px-6 py-4">
            <div className="flex gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-1">HIPAA Compliant</p>
                <p className="text-xs text-blue-800">This mockup demonstrates HIPAA compliance principles. In production, all data must be encrypted and stored securely.</p>
              </div>
            </div>
          </div>
        )}
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Enter your practice details to get started
          </CardDescription>
          <div className="pt-3 bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-900 flex gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>New accounts require admin approval and email verification before activation</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full h-11 relative" type="button">
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
            Sign up with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Dr. Jane Smith" {...field} autoComplete="name" maxLength={100} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work Email</FormLabel>
                    <FormControl>
                      <Input placeholder="jane@clinic.com" type="email" {...field} autoComplete="email" maxLength={255} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        {...field}
                        autoComplete="new-password"
                        maxLength={128}
                      />
                    </FormControl>
                    <div className="text-xs text-slate-500 mt-2 space-y-1">
                      <p>✓ At least 8 characters</p>
                      <p>✓ One uppercase letter (A-Z)</p>
                      <p>✓ One lowercase letter (a-z)</p>
                      <p>✓ One number (0-9)</p>
                      <p>✓ One special character (!@#$%^&*)</p>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medical Specialty</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select specialty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[300px]">
                        <SelectItem value="allergy">Allergy and Immunology</SelectItem>
                        <SelectItem value="anesthesiology">Anesthesiology</SelectItem>
                        <SelectItem value="cardio">Cardiology</SelectItem>
                        <SelectItem value="dental">Dentistry</SelectItem>
                        <SelectItem value="derm">Dermatology</SelectItem>
                        <SelectItem value="emergency">Emergency Medicine</SelectItem>
                        <SelectItem value="endocrinology">Endocrinology</SelectItem>
                        <SelectItem value="family">Family Medicine</SelectItem>
                        <SelectItem value="gastro">Gastroenterology</SelectItem>
                        <SelectItem value="surgery">General Surgery</SelectItem>
                        <SelectItem value="geriatrics">Geriatrics</SelectItem>
                        <SelectItem value="hematology">Hematology</SelectItem>
                        <SelectItem value="infectious">Infectious Disease</SelectItem>
                        <SelectItem value="internal">Internal Medicine</SelectItem>
                        <SelectItem value="nephrology">Nephrology</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                        <SelectItem value="obgyn">Obstetrics and Gynecology</SelectItem>
                        <SelectItem value="oncology">Oncology</SelectItem>
                        <SelectItem value="ophthalmology">Ophthalmology</SelectItem>
                        <SelectItem value="ortho">Orthopedics</SelectItem>
                        <SelectItem value="ent">Otolaryngology (ENT)</SelectItem>
                        <SelectItem value="pathology">Pathology</SelectItem>
                        <SelectItem value="peds">Pediatrics</SelectItem>
                        <SelectItem value="pmr">Physical Medicine and Rehabilitation</SelectItem>
                        <SelectItem value="plastic">Plastic Surgery</SelectItem>
                        <SelectItem value="podiatry">Podiatry</SelectItem>
                        <SelectItem value="psychiatry">Psychiatry</SelectItem>
                        <SelectItem value="pulmonology">Pulmonology</SelectItem>
                        <SelectItem value="radiology">Radiology</SelectItem>
                        <SelectItem value="rheumatology">Rheumatology</SelectItem>
                        <SelectItem value="sports">Sports Medicine</SelectItem>
                        <SelectItem value="urology">Urology</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="officeManagerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Office Manager Email <span className="text-muted-foreground font-normal">(Optional)</span></FormLabel>
                    <FormControl>
                      <Input placeholder="manager@clinic.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full mt-4" disabled={isLoading || signupSuccess}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </Form>
        </CardContent>
        {!signupSuccess && (
          <CardFooter className="flex justify-center pb-6">
            <div className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Log in
              </Link>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
