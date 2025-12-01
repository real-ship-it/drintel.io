import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "wouter";

const tiers = [
  {
    name: "Solo Practice",
    price: "$49",
    description: "Essential compliance tools for individual practitioners.",
    features: [
      "Single provider license",
      "Basic HIPAA training modules",
      "Document storage (10GB)",
      "Email support",
      "Monthly compliance checklist"
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Clinic Pro",
    price: "$149",
    description: "Complete solution for growing medical offices.",
    features: [
      "Up to 5 providers",
      "Advanced OSHA & HIPAA training",
      "Unlimited document storage",
      "Priority email & chat support",
      "Automated audit reporting",
      "Staff role management"
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise Network",
    price: "Custom",
    description: "Scalable infrastructure for hospital networks.",
    features: [
      "Unlimited providers",
      "Custom training content",
      "Dedicated account manager",
      "API access & SSO",
      "Multi-location dashboard",
      "On-site training options"
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function PricingTiers() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 mb-4">
            Transparent pricing for peace of mind
          </h2>
          <p className="text-lg text-slate-600">
            Choose the plan that fits your practice size. All plans include our secure encryption guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <Card 
              key={index} 
              className={`relative flex flex-col ${tier.popular ? 'border-primary shadow-lg scale-105 z-10' : 'border-slate-200 shadow-sm'}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <div className="mt-4 flex items-baseline text-slate-900">
                  <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                  {tier.price !== "Custom" && <span className="ml-1 text-xl font-semibold text-slate-500">/mo</span>}
                </div>
                <CardDescription className="mt-2">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-teal-500 shrink-0 mr-3" />
                      <span className="text-sm text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <a href="/signup" className="w-full">
                  <Button 
                    className="w-full" 
                    variant={tier.popular ? "default" : "outline"}
                    size="lg"
                    asChild
                  >
                    <span>{tier.cta}</span>
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-teal-500"></span>
                Secure payments powered by Stripe
            </p>
        </div>
      </div>
    </section>
  );
}
