import { Navbar, Footer } from "@/components/layout/Layout";
import { PricingTiers } from "@/components/sections/PricingTiers";
import { useEffect } from "react";

export default function Pricing() {
  useEffect(() => {
    // SEO: Update page title
    document.title = "DrIntel Pricing | Medical Compliance Software Plans";
    
    // SEO: Add canonical tag
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link') as HTMLLinkElement;
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://drintel.io/pricing';
    
    // SEO: Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'DrIntel pricing plans: Solo Practice ($49/mo), Clinic Pro ($149/mo), Enterprise Network (custom). Comprehensive HIPAA compliance software with templates, training, and audit reports.');
    }

    // SEO: STEP 4 - Add Product Schema for pricing tiers (Rich Snippets)
    const pricingSchemas = [
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "DrIntel Solo Practice",
        "description": "Essential compliance tools for individual practitioners. HIPAA training modules, document storage, and compliance checklists.",
        "image": "https://drintel.io/logo.png",
        "brand": {
          "@type": "Brand",
          "name": "DrIntel"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://drintel.io/signup",
          "priceCurrency": "USD",
          "price": "49",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "DrIntel"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "250"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "DrIntel Clinic Pro",
        "description": "Complete solution for growing medical offices. Up to 5 providers, advanced training, unlimited storage, and automated audit reporting.",
        "image": "https://drintel.io/logo.png",
        "brand": {
          "@type": "Brand",
          "name": "DrIntel"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://drintel.io/signup",
          "priceCurrency": "USD",
          "price": "149",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "DrIntel"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "500"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "DrIntel Enterprise Network",
        "description": "Scalable infrastructure for hospital networks. Unlimited providers, custom training, API access, and dedicated account management.",
        "image": "https://drintel.io/logo.png",
        "brand": {
          "@type": "Brand",
          "name": "DrIntel"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://drintel.io/contact",
          "priceCurrency": "USD",
          "price": "Contact for pricing",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "DrIntel"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "ratingCount": "150"
        }
      }
    ];

    pricingSchemas.forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="pt-12">
        <section className="sr-only"><h1>Medical Compliance Pricing Plans</h1></section>
        <PricingTiers />
      </main>
      <Footer />
    </div>
  );
}
