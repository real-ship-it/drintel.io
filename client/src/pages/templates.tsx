import { Navbar, Footer } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, CheckCircle, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const defaultTemplates = [
  {
    id: "hipaa-privacy",
    title: "HIPAA Privacy Policy",
    category: "HIPAA",
    description: "Standard Notice of Privacy Practices (NPP) updated for 2025 regulations.",
    lastUpdated: "Nov 10, 2025",
    status: "Ready",
    downloads: 1240
  },
  {
    id: "osha-bloodborne",
    title: "Bloodborne Pathogens Exposure Control Plan",
    category: "OSHA",
    description: "Comprehensive exposure control plan template for medical offices.",
    lastUpdated: "Oct 05, 2025",
    status: "Ready",
    downloads: 850
  },
  {
    id: "hipaa-security",
    title: "HIPAA Security Risk Assessment",
    category: "HIPAA",
    description: "Self-assessment tool to identify potential risks and vulnerabilities.",
    lastUpdated: "Nov 22, 2025",
    status: "Updated",
    downloads: 2100
  },
  {
    id: "osha-hazard",
    title: "Hazard Communication Standard Program",
    category: "OSHA",
    description: "Written hazard communication program template including chemical inventory logs.",
    lastUpdated: "Sep 15, 2025",
    status: "Ready",
    downloads: 640
  },
  {
    id: "emergency-action",
    title: "Emergency Action Plan",
    category: "General",
    description: "Procedures for reporting fires and other emergencies.",
    lastUpdated: "Aug 20, 2025",
    status: "Ready",
    downloads: 920
  },
  {
    id: "ba-agreement",
    title: "Business Associate Agreement (BAA)",
    category: "HIPAA",
    description: "Contract template for vendors handling PHI.",
    lastUpdated: "Nov 01, 2025",
    status: "Review",
    downloads: 1500
  }
];

export default function Templates() {
  const [templates, setTemplates] = useState(defaultTemplates);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const { data, error } = await supabase
          .from('templates')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        if (data && data.length > 0) {
          const mappedTemplates = data.map((template: any) => ({
            id: template.id,
            title: template.name,
            category: template.category || 'General',
            description: template.description || 'Template',
            lastUpdated: new Date(template.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            status: 'Ready',
            downloads: 0,
            file_url: template.file_url
          }));
          setTemplates(mappedTemplates);
        }
      } catch (error) {
        console.error('Error fetching templates:', error);
        setTemplates(defaultTemplates);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold font-heading text-slate-900 mb-4">Compliance Templates</h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Pre-configured, legally reviewed templates for HIPAA and OSHA compliance. 
            Download, customize, and deploy to your practice in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="flex flex-col border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={template.category === 'HIPAA' ? 'default' : template.category === 'OSHA' ? 'destructive' : 'secondary'} className="mb-2">
                    {template.category}
                  </Badge>
                  {template.status === 'Updated' && (
                    <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Updated
                    </span>
                  )}
                </div>
                <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                  {template.title}
                </CardTitle>
                <CardDescription className="text-slate-500">
                  Last updated: {template.lastUpdated}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-slate-600 text-sm leading-relaxed">
                  {template.description}
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <a href="/templates/sample-template.txt" download={`DrIntel-${template.id}.txt`} className="w-full">
                  <Button className="w-full gap-2 group-hover:bg-primary/90">
                    <Download className="w-4 h-4" /> Download Template
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 p-8 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col md:flex-row items-center gap-8">
          <div className="p-4 bg-white rounded-full shadow-sm text-blue-600">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Need a custom policy?</h3>
            <p className="text-slate-600">Our compliance team can draft custom policies specific to your practice's unique needs.</p>
          </div>
          <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-100">
            Request Custom Policy
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
