import { Navbar, Footer } from "@/components/layout/Layout";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";

export default function Terms() {
  useEffect(() => {
    // SEO: Update page title
    document.title = "Terms of Service | DrIntel Medical Compliance";
    
    // SEO: Add canonical tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://drintel.io/terms';
    
    // SEO: Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'DrIntel Terms of Service: Educational guidance for healthcare compliance. This is NOT legal advice. Read our full terms and disclaimer before using DrIntel.');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        {/* Critical Disclaimer Banner */}
        <div className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-lg p-6">
          <div className="flex gap-4">
            <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-red-900 mb-2">⚠️ Important Disclaimer</h2>
              <p className="text-red-800 font-semibold mb-2">
                DrIntel provides EDUCATIONAL and GUIDANCE materials only. This is NOT legal advice.
              </p>
              <p className="text-red-700 text-sm">
                All content on this platform is for informational purposes only and should not be relied upon as legal, 
                financial, or professional advice. You must consult with qualified healthcare attorneys, compliance experts, 
                and regulatory professionals before making any compliance decisions.
              </p>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold font-heading text-slate-900 mb-2">Terms of Service</h1>
        <p className="text-lg text-slate-600 mb-8">Last Updated: December 2025</p>

        <div className="space-y-8 text-slate-700">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">1. Educational Purpose & Guidance Only</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="font-semibold text-blue-900 mb-2">🎓 What DrIntel Provides:</p>
              <p className="text-blue-800 text-sm">
                DrIntel is an educational platform that provides general guidance, templates, and training materials 
                to help healthcare practices understand compliance concepts and best practices. All materials are for 
                informational and educational purposes only.
              </p>
            </div>
            <p className="mb-4">
              <strong>This is NOT legal advice.</strong> Nothing in DrIntel should be interpreted, relied upon, or used as 
              legal advice, regulatory guidance, or compliance recommendations. Healthcare compliance laws are complex, 
              jurisdictional, and constantly evolving.
            </p>
            <p>
              By using DrIntel, you acknowledge that you understand this is educational material meant to increase awareness 
              and provide general guidance, not to serve as your primary source of compliance strategy or legal direction.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">2. Professional Consultation Required</h2>
            <p className="mb-4">
              <strong>You must consult with qualified professionals</strong> before implementing any compliance strategy, policy, 
              or procedure. This includes:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-2">
              <li><strong>Healthcare Attorneys:</strong> For legal compliance and risk mitigation</li>
              <li><strong>Compliance Officers/Consultants:</strong> For regulatory interpretation and implementation</li>
              <li><strong>Industry Experts:</strong> For specialty-specific compliance requirements</li>
              <li><strong>Regulatory Agencies:</strong> HHS, CMS, state health departments, and OSHA for authoritative guidance</li>
            </ul>
            <p>
              DrIntel content is a starting point for education, not a substitute for professional advisors who understand 
              your specific practice, jurisdiction, and regulatory environment.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">3. No Warranty or Guarantee</h2>
            <p className="mb-4">
              DrIntel provides content "as-is" without any warranties or guarantees:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-2">
              <li>Materials may not reflect the most current regulations or laws</li>
              <li>Content may not apply to your specific jurisdiction or medical specialty</li>
              <li>Training modules are general education, not certified compliance courses</li>
              <li>Templates are starting points that require customization and legal review</li>
              <li>Audit reports are generated for awareness, not regulatory certification</li>
            </ul>
            <p>
              DrIntel makes no guarantee that use of this platform will result in compliance with any law or regulation.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">4. Your Responsibility</h2>
            <p className="mb-4">
              <strong>You are responsible for your own compliance.</strong> By using DrIntel, you agree that:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>You will verify all information independently</li>
              <li>You will consult qualified professionals before taking action</li>
              <li>You will not rely solely on DrIntel for compliance decisions</li>
              <li>You understand your practice's unique compliance obligations</li>
              <li>You will monitor regulatory changes and update practices accordingly</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">5. Regulatory Compliance Disclaimers</h2>
            <p className="mb-4">
              Specific areas where professional consultation is essential:
            </p>
            
            <div className="space-y-4">
              <div className="bg-slate-100 p-4 rounded-lg">
                <h3 className="font-bold text-slate-900 mb-2">HIPAA & Privacy</h3>
                <p className="text-sm text-slate-700">
                  DrIntel provides general HIPAA education. Your practice must work with healthcare privacy attorneys 
                  and your state's health department to ensure full HIPAA compliance. HIPAA violations carry criminal 
                  and civil penalties.
                </p>
              </div>

              <div className="bg-slate-100 p-4 rounded-lg">
                <h3 className="font-bold text-slate-900 mb-2">OSHA Compliance</h3>
                <p className="text-sm text-slate-700">
                  Our OSHA training is educational only. Your practice must consult with OSHA-certified safety consultants 
                  and ensure all requirements are met. Non-compliance can result in significant fines.
                </p>
              </div>

              <div className="bg-slate-100 p-4 rounded-lg">
                <h3 className="font-bold text-slate-900 mb-2">State & Local Regulations</h3>
                <p className="text-sm text-slate-700">
                  Compliance requirements vary significantly by state and specialty. You must verify all requirements 
                  with your state medical board, health department, and specialty-specific regulators.
                </p>
              </div>

              <div className="bg-slate-100 p-4 rounded-lg">
                <h3 className="font-bold text-slate-900 mb-2">Insurance & Risk Management</h3>
                <p className="text-sm text-slate-700">
                  Consult with your malpractice and liability insurance carrier to ensure your compliance strategy 
                  meets their requirements and maintains your coverage.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">6. Limitations of Liability</h2>
            <p className="mb-4">
              DrIntel and its creators are not liable for:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-2">
              <li>Non-compliance with any law or regulation</li>
              <li>Regulatory fines, penalties, or legal action</li>
              <li>Loss of licensure or operational disruption</li>
              <li>Any reliance on DrIntel content without professional review</li>
              <li>Outdated or jurisdictionally-inapplicable information</li>
            </ul>
            <p>
              Use of DrIntel is at your own risk. You assume full responsibility for verifying accuracy and consulting 
              qualified professionals.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">7. Acceptable Use</h2>
            <p className="mb-4">
              You agree to use DrIntel only for:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 ml-2">
              <li>Educational purposes to increase compliance awareness</li>
              <li>Training your staff on compliance concepts</li>
              <li>Creating a starting framework for professional advisors to review</li>
              <li>Monitoring compliance trends and best practices</li>
            </ul>
            <p>
              You may NOT use DrIntel as your sole compliance resource or rely on it without professional guidance.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">8. Modifications to Terms</h2>
            <p className="mb-4">
              DrIntel may update these terms at any time. Your continued use constitutes acceptance of updated terms. 
              We encourage you to review these terms regularly.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">9. Contact & Questions</h2>
            <p className="mb-4">
              If you have questions about these terms or how DrIntel should be used within your compliance framework, 
              please contact us at:
            </p>
            <div className="bg-slate-100 p-4 rounded-lg">
              <p className="font-semibold text-slate-900">support@drintel.io</p>
              <p className="text-sm text-slate-600 mt-2">
                Note: DrIntel support cannot provide legal or regulatory advice. We can clarify how to use DrIntel 
                as an educational tool within your compliance program.
              </p>
            </div>
          </section>

          {/* Final Banner */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-bold text-amber-900 mb-2">🎯 Remember:</h3>
            <p className="text-amber-800">
              DrIntel is a tool for healthcare compliance education and awareness. Implement any compliance strategy 
              only after thorough review by qualified healthcare attorneys, compliance consultants, and regulatory experts. 
              Your practice's compliance success depends on professional guidance tailored to your specific situation.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
