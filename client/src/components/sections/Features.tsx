import { CheckCircle, Lock, Zap, FileText, Users, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Automated Audits",
    description: "Run continuous compliance checks against the latest healthcare regulations automatically.",
    icon: Zap,
  },
  {
    title: "Secure Document Vault",
    description: "Store sensitive practice documents with bank-grade encryption and role-based access.",
    icon: Lock,
  },
  {
    title: "Staff Training Tracking",
    description: "Assign, track, and certify staff training modules. Never miss a renewal deadline.",
    icon: Users,
  },
  {
    title: "Instant Reporting",
    description: "Generate comprehensive compliance reports for board meetings or external auditors in seconds.",
    icon: FileText,
  },
  {
    title: "HIPAA & OSHA Ready",
    description: "Pre-configured templates and checklists for standard regulatory bodies.",
    icon: CheckCircle,
  },
  {
    title: "Practice Analytics",
    description: "Visualize compliance health across multiple office locations from a single dashboard.",
    icon: BarChart3,
  },
];

export function Features() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 mb-4">
            Everything you need to stay compliant
          </h2>
          <p className="text-lg text-slate-600">
            Focus on patient care while DrIntel handles the regulatory heavy lifting.
            Designed specifically for the workflow of modern medical practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl font-semibold text-slate-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
