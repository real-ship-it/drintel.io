import { Navbar, Footer } from "@/components/layout/Layout";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { PricingTiers } from "@/components/sections/PricingTiers";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, TrendingUp, Users, Award, Zap } from "lucide-react";
import { useState, useEffect } from "react";

function DynamicStats() {
  const [audits, setAudits] = useState(0);
  const [offices, setOffices] = useState(0);
  const [compliance, setCompliance] = useState(0);

  useEffect(() => {
    const intervals = [
      setInterval(() => setAudits(prev => prev < 2847 ? prev + Math.floor(Math.random() * 15) : 2847), 50),
      setInterval(() => setOffices(prev => prev < 2156 ? prev + Math.floor(Math.random() * 12) : 2156), 55),
      setInterval(() => setCompliance(prev => prev < 98 ? prev + Math.floor(Math.random() * 2) : 98), 60),
    ];
    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50 border-b border-blue-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 mb-4">
            DrIntel by the Numbers
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Powering compliance for healthcare practices worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Audits Completed */}
          <div className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-500 transition-colors">
                <TrendingUp className="w-6 h-6 text-blue-600 group-hover:text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600">Audits Completed</p>
              </div>
            </div>
            <div className="text-4xl font-bold text-blue-600 font-heading mb-2">
              {audits.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500">This month</p>
          </div>

          {/* Active Offices */}
          <div className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-teal-100 rounded-lg group-hover:bg-teal-500 transition-colors">
                <Users className="w-6 h-6 text-teal-600 group-hover:text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600">Active Offices</p>
              </div>
            </div>
            <div className="text-4xl font-bold text-teal-600 font-heading mb-2">
              {offices.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500">Using DrIntel</p>
          </div>

          {/* Avg Compliance */}
          <div className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-500 transition-colors">
                <Award className="w-6 h-6 text-green-600 group-hover:text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600">Avg Compliance</p>
              </div>
            </div>
            <div className="text-4xl font-bold text-green-600 font-heading mb-2">
              {compliance}%
            </div>
            <p className="text-xs text-slate-500">Score across clients</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function InteractiveBenefits() {
  const [expanded, setExpanded] = useState(0);

  const benefits = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning-Fast Audits",
      description: "Complete compliance audits in minutes, not days. Automated scanning catches issues before they become problems.",
      color: "bg-yellow-500"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Certification Ready",
      description: "Pre-built HIPAA and OSHA templates get you audit-ready instantly. Meet regulations with confidence.",
      color: "bg-purple-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Training",
      description: "Streamlined staff training modules ensure your entire team stays compliant with the latest regulations.",
      color: "bg-pink-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Real-Time Reports",
      description: "Get instant insights into your compliance status with interactive dashboards and actionable reports.",
      color: "bg-cyan-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 mb-4">
            Why Healthcare Teams Love DrIntel
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Designed by compliance experts for modern medical practices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              onClick={() => setExpanded(expanded === index ? -1 : index)}
              className="group relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 cursor-pointer transition-all duration-300 transform hover:scale-105"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

              <div className="relative z-10">
                <div className={`w-14 h-14 ${benefit.color} rounded-lg flex items-center justify-center text-white mb-4 transform transition-transform group-hover:scale-110 group-hover:rotate-12`}>
                  {benefit.icon}
                </div>

                <h3 className="text-xl font-bold font-heading text-slate-900 mb-2">
                  {benefit.title}
                </h3>

                <p className={`text-slate-600 text-sm transition-all duration-300 ${
                  expanded === index ? 'opacity-100 max-h-20' : 'opacity-75 max-h-12 overflow-hidden'
                }`}>
                  {benefit.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-400 group-hover:text-slate-700">
                  <span>{expanded === index ? '▼' : '▶'}</span>
                  <span>{expanded === index ? 'Less' : 'Learn more'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    // SEO: Update page title
    document.title = "DrIntel - Medical Compliance Software | HIPAA Templates & Training";
    
    // SEO: Add canonical tag
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link') as HTMLLinkElement;
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://drintel.io';
    
    // SEO: Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'DrIntel: The all-in-one medical compliance platform. HIPAA templates, OSHA training modules, compliance audits, and staff training for healthcare practices.');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <DynamicStats />
        <Features />
        <InteractiveBenefits />
        
        {/* Trust Section */}
        <section className="py-16 border-y border-slate-100 bg-gradient-to-r from-blue-50 to-teal-50">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">Trusted by over 2,000 medical offices</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Placeholder Logos */}
              <div className="text-2xl font-bold text-slate-300 flex justify-center hover:text-slate-500">MediCare+</div>
              <div className="text-2xl font-bold text-slate-300 flex justify-center hover:text-slate-500">HealthFirst</div>
              <div className="text-2xl font-bold text-slate-300 flex justify-center hover:text-slate-500">ClinicFlow</div>
              <div className="text-2xl font-bold text-slate-300 flex justify-center hover:text-slate-500">DocUnited</div>
              <div className="text-2xl font-bold text-slate-300 flex justify-center hover:text-slate-500">OrthoNet</div>
            </div>
          </div>
        </section>

        <PricingTiers />
        
        <section className="py-24 bg-slate-900 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Ready to streamline your compliance?</h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">Join thousands of healthcare providers who trust DrIntel.</p>
            <Link href="/signup" className="inline-block">
              <Button size="lg" className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold h-14 px-10 text-lg">
                Get Started Today
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
