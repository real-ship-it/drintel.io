// SEO Schema Utilities for JSON-LD structured data

export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://drintel.io"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://drintel.io/blog"
    }
  ]
};

export const blogArticleSchema = (article: any) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": article.title,
  "description": article.excerpt,
  "datePublished": article.date,
  "author": {
    "@type": "Person",
    "name": article.author
  },
  "publisher": {
    "@type": "Organization",
    "name": "DrIntel",
    "logo": {
      "@type": "ImageObject",
      "url": "https://drintel.io/logo.png"
    }
  },
  "keywords": article.category
});

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is HIPAA compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HIPAA is a federal law requiring secure handling of Protected Health Information (PHI)."
      }
    },
    {
      "@type": "Question",
      "name": "Is DrIntel legal advice?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. DrIntel provides educational guidance only. Consult qualified healthcare attorneys for legal advice."
      }
    }
  ]
};
