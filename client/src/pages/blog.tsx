import { Navbar, Footer } from "@/components/layout/Layout";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// Default mock articles as fallback
const defaultBlogArticles = [
  {
    id: "1",
    slug: "hipaa-compliance-guide-2025",
    title: "Complete Guide to HIPAA Compliance for Medical Offices in 2025",
    excerpt: "Learn the essential steps to ensure your medical practice meets HIPAA requirements and protects patient privacy.",
    body: `HIPAA (Health Insurance Portability and Accountability Act) compliance is non-negotiable for healthcare practices. In 2025, with increasing cyber threats and evolving regulations, understanding HIPAA is more critical than ever.

## What is HIPAA?

HIPAA is a federal law that requires the creation of national standards and procedures for the secure handling of Protected Health Information (PHI). It applies to covered entities (healthcare providers, health plans, healthcare clearinghouses) and their business associates.

## Key HIPAA Requirements

**1. Privacy Rule**
The Privacy Rule sets standards for the use and disclosure of PHI. Patients have the right to access, amend, and receive an accounting of disclosures of their medical information.

**2. Security Rule**
The Security Rule requires appropriate safeguards for electronic PHI (ePHI), including administrative, physical, and technical measures.

**3. Breach Notification Rule**
If a breach of unsecured PHI occurs, you must notify affected individuals, the media (if 500+ people affected), and HHS.

## Steps to Ensure HIPAA Compliance

- Conduct a comprehensive risk analysis of your systems and processes
- Implement administrative safeguards (access controls, staff training, security policies)
- Deploy technical safeguards (encryption, authentication, audit controls)
- Establish physical safeguards (facility access controls, workstation security)
- Create a breach response plan and notification procedures
- Maintain detailed documentation of all compliance efforts

## Common HIPAA Violations

- Unauthorized access to patient records
- Failure to encrypt patient data
- Inadequate business associate agreements
- Insufficient staff training
- Poor password management
- Unattended computer workstations

## Penalties for Non-Compliance

HIPAA violations can result in civil penalties ranging from $100 to $50,000 per violation, with annual maximums reaching into the millions. Criminal violations can result in fines up to $250,000 and imprisonment.

## Conclusion

HIPAA compliance is an ongoing process, not a one-time effort. Regular training, system updates, and risk assessments are essential to maintaining compliance and protecting patient privacy.`,
    date: "Dec 15, 2025",
    category: "Compliance",
    readTime: "8 min read",
    image: "bg-gradient-to-br from-blue-500 to-indigo-600"
  },
  {
    id: 2,
    slug: "osha-bloodborne-pathogens-training",
    title: "OSHA Bloodborne Pathogens Training: What Every Medical Practice Needs to Know",
    excerpt: "Essential information about OSHA bloodborne pathogen standards and how to protect your staff from infectious diseases.",
    content: `Occupational Safety and Health Administration (OSHA) bloodborne pathogens regulations are critical for protecting healthcare workers. This comprehensive guide covers everything you need to know.

## Understanding Bloodborne Pathogens

Bloodborne pathogens are disease-causing microorganisms found in blood and other body fluids. The most common include:
- HIV (Human Immunodeficiency Virus)
- Hepatitis B Virus (HBV)
- Hepatitis C Virus (HCV)

## OSHA's Bloodborne Pathogens Standard

The OSHA Standard (29 CFR 1910.1030) requires employers to implement an exposure control plan to minimize employee risk of exposure.

## Exposure Control Plan Requirements

**Written Plan**
Your practice must have a written exposure control plan that:
- Identifies job classifications with occupational exposure
- Describes how you'll implement standard precautions
- Outlines hepatitis B vaccination procedures
- Details post-exposure evaluation and follow-up procedures

**Standard Precautions**
- Treat all blood and body fluids as potentially infectious
- Use appropriate personal protective equipment (PPE)
- Practice proper hand hygiene
- Use proper engineering controls

**Engineering and Work Practice Controls**
- Sharps containers placed near point of use
- Needlestick prevention devices
- Proper handling and disposal of contaminated materials
- Handwashing facilities readily available

## Hepatitis B Vaccination

Employers must provide free Hepatitis B vaccination to all employees with occupational exposure within 10 days of hire or transfer.

## Training Requirements

All employees with occupational exposure must receive training:
- At the time of hire
- Annually (at minimum)
- When new procedures or equipment are introduced
- When changes occur to the control plan

Training must cover:
- Transmission routes and prevention
- How to recognize tasks with potential exposure
- Use of engineering controls and PPE
- Post-exposure procedures
- Labeling and signs

## Recordkeeping

Maintain records for:
- Employees with occupational exposure
- Vaccination status and declined vaccinations
- Post-exposure medical evaluations
- Exposure incidents and investigations

## Penalties for Non-Compliance

OSHA violations can result in significant fines, with penalties up to $16,000+ per violation. More importantly, non-compliance puts your staff at serious health risk.

## Conclusion

OSHA bloodborne pathogen compliance protects your most valuable asset—your staff. Regular training, proper equipment, and a solid exposure control plan are investments in workplace safety.`,
    date: "Dec 10, 2025",
    category: "Safety",
    readTime: "7 min read",
    image: "bg-gradient-to-br from-red-500 to-orange-600"
  },
  {
    id: 3,
    slug: "patient-privacy-best-practices",
    title: "Patient Privacy Best Practices: Creating a Culture of Confidentiality",
    excerpt: "Build a patient-first privacy culture in your medical practice with these proven best practices and strategies.",
    content: `Patient privacy is the foundation of trust in healthcare. Here's how to create and maintain a culture of confidentiality in your practice.

## Why Patient Privacy Matters

Patient privacy violations damage trust, expose practices to legal liability, and create unnecessary stress for patients. Patients are more likely to share sensitive health information when they trust that it will be protected.

## Assess Your Privacy Risks

Conduct a privacy audit to identify vulnerabilities:
- Who has access to patient records?
- What systems store patient data?
- How is data transmitted?
- Are there gaps in physical security?
- How are terminated employees handled?

## Staff Training and Culture

**Initial Training**
- All new hires must receive privacy training
- Training should cover HIPAA basics, your specific policies, and consequences
- Document all training

**Ongoing Education**
- Annual refresher training
- Updates when regulations change
- Real-world scenario discussions
- Make privacy part of your practice culture

## Physical Security

- Restrict access to medical records areas
- Use privacy screens on computer monitors
- Implement clean desk policies
- Secure fax machines in restricted areas
- Use privacy partitions in waiting and check-in areas

## Digital Security

- Use strong, unique passwords
- Enable multi-factor authentication
- Encrypt sensitive data
- Keep systems patched and updated
- Use secure networks (not public WiFi for patient data)
- Implement audit logs to track who accesses records

## Business Associate Agreements

Ensure all vendors, cloud providers, and third parties have signed Business Associate Agreements (BAAs) that obligate them to protect patient privacy.

## Patient Rights

Inform patients of:
- Their privacy rights
- How you use their information
- How they can access their records
- How to file complaints
- Who to contact with privacy concerns

## Breach Response Plan

Have a documented plan for responding to privacy breaches:
- Immediate containment steps
- Notification procedures
- Documentation requirements
- Communication with patients and authorities
- Prevention measures for future incidents

## Conclusion

Patient privacy is everyone's responsibility. By implementing these best practices, you protect patients, reduce liability, and build the trust that makes healthcare possible.`,
    date: "Dec 5, 2025",
    category: "Privacy",
    readTime: "6 min read",
    image: "bg-gradient-to-br from-green-500 to-emerald-600"
  },
  {
    id: 4,
    slug: "medical-compliance-audit-preparation",
    title: "Preparing for a Medical Compliance Audit: Complete Checklist",
    excerpt: "Get your practice audit-ready with this comprehensive checklist and preparation guide.",
    content: `A compliance audit can feel overwhelming, but with proper preparation, you can demonstrate your commitment to regulatory standards. Here's your complete guide.

## What Auditors Look For

Medical compliance auditors evaluate:
- Documentation and record-keeping
- Staff training and competency
- Privacy and security safeguards
- Billing and coding accuracy
- Patient rights adherence
- Infection control procedures
- Medication management (if applicable)

## Pre-Audit Assessment

**30 Days Before Audit**
- Notify all staff about the upcoming audit
- Review your compliance policies and procedures
- Conduct an internal audit
- Identify and address any obvious gaps
- Update documentation as needed

**2 Weeks Before Audit**
- Ensure all training records are current
- Verify that all staff acknowledgments are signed
- Test your document storage and retrieval systems
- Prepare a quiet space for auditor interviews
- Create a list of key contacts and their availability

**1 Week Before Audit**
- Brief your staff on audit procedures
- Remind staff not to discuss the audit with patients
- Review privacy and security protocols
- Ensure physical spaces are organized
- Prepare copies of key documentation

## Documentation Checklist

- ✅ Policies and procedures manual
- ✅ Staff training records
- ✅ Patient privacy notices
- ✅ Authorization forms
- ✅ Incident and breach reports
- ✅ Business Associate Agreements
- ✅ Risk assessments
- ✅ Audit logs and access controls
- ✅ Infection control procedures
- ✅ Medication records (if applicable)

## During the Audit

**Communication**
- Be professional and cooperative
- Answer questions honestly and completely
- Don't volunteer information beyond what's asked
- Take notes on any concerns raised
- Ask for clarification if needed

**Document Access**
- Provide organized access to requested documents
- Have a designated staff member available to assist
- Respond promptly to information requests
- Keep copies of everything you provide

**Staff Interviews**
- Ensure staff are briefed on audit procedures
- Remind them to answer honestly
- Don't coach staff on "correct" answers
- Address any discrepancies afterward

## Post-Audit Actions

**If Issues Are Found**
- Request a detailed written report
- Develop a corrective action plan
- Assign responsibility for each corrective action
- Set realistic timelines
- Document implementation of corrections
- Follow up to verify success

**Continuous Improvement**
- Schedule regular internal audits
- Update policies based on findings
- Enhance staff training programs
- Monitor compliance metrics
- Stay informed about regulatory changes

## Common Audit Findings and How to Address Them

**Finding: Inadequate documentation**
Solution: Implement standardized forms and templates

**Finding: Insufficient staff training**
Solution: Develop comprehensive training schedule and track attendance

**Finding: Privacy violations**
Solution: Strengthen access controls and privacy safeguards

**Finding: Security weaknesses**
Solution: Upgrade systems and implement stronger authentication

## Conclusion

Compliance audits are opportunities to demonstrate your commitment to patient care and regulatory standards. With thorough preparation and honest engagement, your practice will emerge stronger and more compliant.`,
    date: "Nov 28, 2025",
    category: "Auditing",
    readTime: "9 min read",
    image: "bg-gradient-to-br from-purple-500 to-pink-600"
  },
  {
    id: 5,
    slug: "medical-records-management-systems",
    title: "Choosing the Right Electronic Medical Records System for Compliance",
    excerpt: "Guide to selecting and implementing EMR systems that support regulatory compliance in your practice.",
    content: `Electronic Medical Records (EMR) systems are critical infrastructure for compliance. Here's how to choose and implement one that meets your needs.

## Why EMR Matters for Compliance

Proper EMR systems:
- Provide audit trails of who accessed records and when
- Enable secure patient data storage and transmission
- Support proper access controls
- Facilitate privacy and security compliance
- Generate required reports and documentation
- Scale as your practice grows

## Key Features to Look For

**Security Features**
- End-to-end encryption for data in transit and at rest
- Multi-factor authentication
- Role-based access controls
- Audit logging
- Automated backups
- Disaster recovery capabilities

**Compliance Features**
- HIPAA compliance certification
- BAA (Business Associate Agreement) included
- State-specific compliance support
- Built-in privacy controls
- Retention policy management
- Breach notification features

**Usability Features**
- Intuitive interface for staff
- Mobile access capabilities
- Integration with existing systems
- Customizable templates
- Patient portal functionality
- Reporting and analytics

## Implementation Considerations

**Selection Process**
- Assess your current workflow and pain points
- Define must-have vs. nice-to-have features
- Get demos from multiple vendors
- Check references with similar practices
- Evaluate total cost of ownership
- Review data export and migration policies

**Change Management**
- Plan a realistic implementation timeline
- Allocate adequate staff training time
- Start with a pilot group or department
- Have vendor support available during transition
- Document new workflows and procedures
- Gather feedback and iterate

**Staff Training**
- Provide comprehensive training to all users
- Create quick-reference guides
- Offer ongoing support and updates
- Document common issues and solutions
- Schedule regular refresher training

## Compliance During Implementation

- Ensure data security during migration
- Maintain audit trails throughout transition
- Document compliance procedures
- Brief staff on new security protocols
- Test access controls thoroughly
- Maintain paper records during transition if needed

## Post-Implementation

- Monitor system performance and security
- Conduct regular backups and test restoration
- Update access controls as staff changes occur
- Stay current with software updates
- Monitor for security vulnerabilities
- Gather staff feedback for improvements

## Red Flags When Choosing an EMR

- ❌ No HIPAA compliance certification
- ❌ Vague or limited audit trail capabilities
- ❌ No encryption options
- ❌ Vendor unfamiliarity with healthcare regulations
- ❌ Poor security reputation or history
- ❌ Limited data export capabilities
- ❌ No disaster recovery plan

## Conclusion

Your EMR system is a cornerstone of compliance. Take time to choose the right one and implement it thoughtfully. The investment pays dividends in regulatory compliance, operational efficiency, and patient care quality.`,
    date: "Nov 20, 2025",
    category: "Technology",
    readTime: "8 min read",
    image: "bg-gradient-to-br from-cyan-500 to-blue-600"
  }
];

export default function Blog() {
  const [articles, setArticles] = useState(defaultBlogArticles);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch articles from Supabase
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        if (data && data.length > 0) {
          // Map Supabase data to match blog format
          const mappedArticles = data.map((post: any) => ({
            id: post.id,
            slug: post.slug,
            title: post.title,
            excerpt: post.body?.substring(0, 150) + '...' || 'No excerpt available',
            content: post.body || '',
            date: new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            category: 'Compliance',
            readTime: `${Math.ceil(post.body?.split(/\s+/).length / 200) || 5} min read`,
            image: 'bg-gradient-to-br from-blue-500 to-indigo-600'
          }));
          setArticles(mappedArticles);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
        setArticles(defaultBlogArticles);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    // SEO: Update page title and meta
    document.title = "Medical Compliance Blog | HIPAA, OSHA, & Healthcare Compliance Articles";
    
    // SEO: Add canonical tag
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link') as HTMLLinkElement;
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://drintel.io/blog';
    
    // SEO: Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Medical compliance blog: Expert articles on HIPAA compliance, OSHA training, healthcare compliance audits, privacy best practices, and medical office compliance tips.');
    }

    // SEO: STEP 3 - Add BreadcrumbList Schema
    const breadcrumbSchema = {
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

    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);

    // SEO: STEP 3 - Add ArticleSchema for each blog post (Rich Snippets)
    articles.forEach((article: any) => {
      const wordCount = (article.content || '').split(/\s+/).length;
      const dateObj = new Date(article.date);
      const datePublished = !isNaN(dateObj.getTime()) ? dateObj.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": article.title,
        "description": article.excerpt,
        "datePublished": datePublished,
        "dateModified": datePublished,
        "keywords": article.category,
        "articleBody": article.content,
        "wordCount": wordCount,
        "url": `https://drintel.io/blog#article-${article.id}`,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://drintel.io/blog"
        },
        "publisher": {
          "@type": "Organization",
          "name": "DrIntel",
          "url": "https://drintel.io",
          "logo": {
            "@type": "ImageObject",
            "url": "https://drintel.io/logo.png"
          }
        }
      };

      const articleScript = document.createElement('script');
      articleScript.type = 'application/ld+json';
      articleScript.textContent = JSON.stringify(articleSchema);
      document.head.appendChild(articleScript);
    });

    return () => {
      if (document.head.contains(breadcrumbScript)) {
        document.head.removeChild(breadcrumbScript);
      }
    };
  }, [articles]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold font-heading mb-4">Compliance Insights & Best Practices</h1>
            <p className="text-xl text-slate-300 max-w-2xl">
              Expert articles on HIPAA, OSHA, medical compliance, and best practices for healthcare practices.
            </p>
          </div>
        </section>

        {/* Featured Article */}
        {articles.length > 0 && (
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className={`${articles[0].image} h-80 rounded-lg shadow-lg`}></div>
              <div>
                <div className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                  FEATURED
                </div>
                <h2 className="text-3xl font-bold font-heading text-slate-900 mb-4">{articles[0].title}</h2>
                <p className="text-lg text-slate-600 mb-6">{articles[0].excerpt}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {articles[0].date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {articles[0].readTime}
                  </div>
                </div>
                <a href={`#article-${articles[0].id}`} className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                  Read Full Article
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Articles Grid */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-heading text-slate-900 mb-12">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.slice(1).map((article) => (
                <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className={`${article.image} h-48`}></div>
                  <div className="p-6">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      {article.category}
                    </div>
                    <h3 className="text-xl font-bold font-heading text-slate-900 mb-3">
                      {article.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                      <span>{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>
                    <a href={`#article-${article.id}`} className="text-primary font-semibold hover:text-primary/80 transition-colors flex items-center gap-2">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Full Articles */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            {articles.map((article: any) => (
              <article key={article.id} id={`article-${article.id}`} className="mb-20 pb-20 border-b border-slate-200 last:border-b-0">
                <div className="mb-6">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    {article.category}
                  </div>
                  <h2 className="text-4xl font-bold font-heading text-slate-900 mb-4">{article.title}</h2>
                  <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {article.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </div>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none text-slate-700 space-y-4">
                  {(article.content || '').split('\n\n').map((paragraph: string, idx: number) => {
                    if (paragraph.startsWith('##')) {
                      return (
                        <h3 key={idx} className="text-2xl font-bold font-heading text-slate-900 mt-8 mb-4">
                          {paragraph.replace('##', '').trim()}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('-')) {
                      return (
                        <ul key={idx} className="list-disc list-inside space-y-2 text-slate-700">
                          {paragraph.split('\n').map((item: string, i: number) => (
                            <li key={i} className="text-slate-700">
                              {item.replace('-', '').trim()}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    if (paragraph.startsWith('✅')) {
                      return (
                        <div key={idx} className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-slate-700">{paragraph}</p>
                        </div>
                      );
                    }
                    if (paragraph.startsWith('❌')) {
                      return (
                        <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <p className="text-slate-700">{paragraph}</p>
                        </div>
                      );
                    }
                    return (
                      <p key={idx} className="text-slate-700 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
