import { Navbar, Footer } from "@/components/layout/Layout";
import aboutImage from "@assets/generated_images/modern_medical_office_team_meeting.png";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    // SEO: Update page title
    document.title = "About DrIntel | Healthcare Compliance Software Company";
    
    // SEO: Add canonical tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://drintel.io/about';
    
    // SEO: Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'About DrIntel: Founded by healthcare professionals, we build compliance software for medical offices. Mission: Simplify healthcare compliance and empower doctors to focus on patient care.');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <div className="bg-slate-50 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 mb-6">Our Mission</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              To simplify the complex world of healthcare compliance, empowering medical professionals to focus on what truly matters: patient care.
            </p>
          </div>
        </div>

        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={aboutImage} 
                  alt="DrIntel Team" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold font-heading text-slate-900">Built by Doctors, for Doctors</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  DrIntel was founded in 2023 after witnessing the administrative burden that compliance regulations place on small and medium-sized practices. We believe that staying compliant shouldn't require a dedicated legal team.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Our platform combines cutting-edge technology with deep regulatory expertise to create a "compliance autopilot" for your office.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-6">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">2k+</div>
                    <div className="text-sm text-slate-500">Active Clinics</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">99%</div>
                    <div className="text-sm text-slate-500">Audit Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
