import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import heroBg from "@assets/generated_images/abstract_medical_technology_hero_background_with_blue_and_teal_gradients.png";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 text-white min-h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Medical Compliance Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl space-y-8"
        >
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary-foreground backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-teal-400 mr-2 animate-pulse"></span>
            New 2025 HIPAA Standards Ready
          </div>
          
          <h1 className="text-5xl md:text-6xl font-heading font-bold leading-tight tracking-tight text-white">
            DrIntel <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Intelligence</span> for Your Practice.
          </h1>
          
          <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
            The all-in-one compliance operating system. Automate trainings, generate OSHA reports, and keep your office audit-ready with DrIntel.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/signup" className="inline-block">
              <Button size="lg" className="text-lg h-12 px-8 bg-primary hover:bg-primary/90 border-0 shadow-lg shadow-blue-900/20">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/about" className="inline-block">
              <Button size="lg" variant="outline" className="text-lg h-12 px-8 border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:text-white text-slate-200 backdrop-blur-sm">
                Learn More
              </Button>
            </Link>
          </div>

          <div className="pt-8 flex items-center gap-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              HIPAA Compliant
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Secure Encryption
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              24/7 Support
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
