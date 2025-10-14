import { createFileRoute } from "@tanstack/react-router";
import { SEO } from "~/components/SEO";
import { Header } from "~/components/ui/Header";
import { Container } from "~/components/ui/Container";
import { Footer } from "~/components/sections/Footer";
import { Shield, Eye, Lock, Cookie, UserCheck, Mail } from "lucide-react";

export const Route = createFileRoute("/privacy-policy/")({
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - Mandate",
    "description": "Learn how Mandate collects, uses, and protects your personal information.",
    "url": "https://mandate.app/privacy-policy",
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Privacy Policy - Mandate"
        description="Learn how Mandate collects, uses, and protects your personal information. We are committed to transparency and protecting your privacy."
        canonical="https://mandate.app/privacy-policy"
        structuredData={structuredData}
      />
      <Header />
      
      <Container className="py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-8 h-8 text-neutral-900" />
              <h1 className="text-4xl font-bold text-neutral-900">Privacy Policy</h1>
            </div>
            <p className="text-lg text-neutral-600">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-neutral-700 leading-relaxed mb-4">
              At Mandate, we are committed to protecting your privacy and being transparent about how we collect, use, and protect your personal information. This Privacy Policy explains our practices regarding data collection and usage on our website.
            </p>
            <p className="text-lg text-neutral-700 leading-relaxed">
              By using our website, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Eye className="w-6 h-6 text-neutral-900" />
              <h2 className="text-2xl font-bold text-neutral-900">Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Automatically Collected Information</h3>
                <p className="text-neutral-700 leading-relaxed mb-3">
                  When you visit our website, we automatically collect certain information about your device and browsing behavior through Google Analytics 4 (GA4). This includes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                  <li><strong>Page views and navigation patterns:</strong> Which pages you visit and how you navigate through our site</li>
                  <li><strong>User engagement metrics:</strong> Time spent on pages, scroll depth, and interaction with content</li>
                  <li><strong>Traffic sources:</strong> How you found our website (organic search, direct, referral, social media, email)</li>
                  <li><strong>Device information:</strong> Browser type, operating system, screen resolution, and device type (desktop, mobile, tablet)</li>
                  <li><strong>Geographic location:</strong> Country and city (approximate location based on IP address, which is anonymized)</li>
                  <li><strong>Session information:</strong> Session duration, bounce rate, and pages per session</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Custom Event Tracking</h3>
                <p className="text-neutral-700 leading-relaxed mb-3">
                  We track specific user interactions to understand how visitors use our website and improve user experience:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                  <li><strong>CTA clicks:</strong> When you click on call-to-action buttons like "Book a demo" or "Get Started"</li>
                  <li><strong>Form submissions:</strong> When you submit forms (we track submission success, not the form content itself)</li>
                  <li><strong>Outbound link clicks:</strong> When you click links to external websites</li>
                  <li><strong>Calculator usage:</strong> When you use our ROI calculator (we track usage patterns, not specific inputs)</li>
                  <li><strong>Article engagement:</strong> When you read, share, or interact with blog articles</li>
                  <li><strong>Scroll depth:</strong> How far you scroll on pages (tracked at 25%, 50%, 75%, and 100% milestones)</li>
                  <li><strong>Section views:</strong> Which sections of our pages you view</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Information You Provide</h3>
                <p className="text-neutral-700 leading-relaxed">
                  If you contact us through forms or email, we collect the information you voluntarily provide, such as your name, email address, company name, and message content. This information is used solely to respond to your inquiry.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <UserCheck className="w-6 h-6 text-neutral-900" />
              <h2 className="text-2xl font-bold text-neutral-900">How We Use Your Information</h2>
            </div>
            
            <p className="text-neutral-700 leading-relaxed mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-700">
              <li><strong>Website improvement:</strong> To understand how visitors use our site and identify areas for improvement</li>
              <li><strong>Performance monitoring:</strong> To monitor and analyze website performance, traffic patterns, and user behavior</li>
              <li><strong>SEO optimization:</strong> To track organic traffic growth, landing page performance, and search engine visibility</li>
              <li><strong>Content optimization:</strong> To understand which content resonates with visitors and improve our messaging</li>
              <li><strong>User experience enhancement:</strong> To identify and fix usability issues and optimize conversion paths</li>
              <li><strong>Marketing effectiveness:</strong> To measure the effectiveness of our marketing campaigns and channels</li>
              <li><strong>Communication:</strong> To respond to your inquiries and provide customer support</li>
            </ul>
          </section>

          {/* Cookies and Tracking */}
          <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Cookie className="w-6 h-6 text-neutral-900" />
              <h2 className="text-2xl font-bold text-neutral-900">Cookies and Tracking Technologies</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-neutral-700 leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are small data files stored on your device.
              </p>
              
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Types of Cookies We Use</h3>
                <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                  <li><strong>Analytics Cookies:</strong> Google Analytics cookies that help us understand how visitors interact with our website. These cookies collect information anonymously and report website trends.</li>
                  <li><strong>Performance Cookies:</strong> Cookies that help us measure website performance and user engagement.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Managing Cookies</h3>
                <p className="text-neutral-700 leading-relaxed">
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website. You can also opt out of Google Analytics tracking by installing the{' '}
                  <a 
                    href="https://tools.google.com/dlpage/gaoptout" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-neutral-900 underline hover:text-neutral-700"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>.
                </p>
              </div>
            </div>
          </section>

          {/* Third-Party Services */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Third-Party Services</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Google Analytics</h3>
                <p className="text-neutral-700 leading-relaxed mb-3">
                  We use Google Analytics 4, a web analytics service provided by Google, Inc. Google Analytics uses cookies to help us analyze how users interact with our website.
                </p>
                <p className="text-neutral-700 leading-relaxed mb-3">
                  The information generated by the cookie about your use of the website (including your IP address, which is anonymized) will be transmitted to and stored by Google on servers in the United States.
                </p>
                <p className="text-neutral-700 leading-relaxed">
                  For more information on Google Analytics' privacy practices, please visit the{' '}
                  <a 
                    href="https://policies.google.com/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-neutral-900 underline hover:text-neutral-700"
                  >
                    Google Privacy Policy
                  </a>.
                </p>
              </div>
            </div>
          </section>

          {/* Data Protection */}
          <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Lock className="w-6 h-6 text-neutral-900" />
              <h2 className="text-2xl font-bold text-neutral-900">Data Protection and Security</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-neutral-700 leading-relaxed">
                We take reasonable measures to protect the information we collect from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
              </p>
              
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">IP Anonymization</h3>
                <p className="text-neutral-700 leading-relaxed">
                  Google Analytics 4 automatically anonymizes IP addresses by default. This means that the last octet of your IP address is removed before any processing or storage occurs, making it impossible to identify individual users.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Data Retention</h3>
                <p className="text-neutral-700 leading-relaxed">
                  Analytics data is retained for 14 months by default in Google Analytics 4. After this period, the data is automatically deleted. We do not store personal information beyond what is necessary for the purposes outlined in this policy.
                </p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Your Rights and Choices</h2>
            
            <div className="space-y-4">
              <p className="text-neutral-700 leading-relaxed">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                <li><strong>Right to Access:</strong> You can request information about the personal data we hold about you</li>
                <li><strong>Right to Rectification:</strong> You can request that we correct any inaccurate personal data</li>
                <li><strong>Right to Erasure:</strong> You can request that we delete your personal data</li>
                <li><strong>Right to Restrict Processing:</strong> You can request that we limit how we use your personal data</li>
                <li><strong>Right to Data Portability:</strong> You can request a copy of your personal data in a structured, machine-readable format</li>
                <li><strong>Right to Object:</strong> You can object to our processing of your personal data</li>
                <li><strong>Right to Opt-Out:</strong> You can opt out of analytics tracking using browser settings or the Google Analytics opt-out add-on</li>
              </ul>
            </div>
          </section>

          {/* GDPR Compliance */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">GDPR Compliance</h2>
            
            <p className="text-neutral-700 leading-relaxed mb-4">
              If you are located in the European Economic Area (EEA), you have certain data protection rights under the General Data Protection Regulation (GDPR). We are committed to complying with GDPR requirements.
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Legal Basis for Processing</h3>
                <p className="text-neutral-700 leading-relaxed">
                  We process your personal data based on the following legal grounds:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-neutral-700 mt-2">
                  <li><strong>Legitimate Interests:</strong> We have a legitimate interest in analyzing website usage to improve our services</li>
                  <li><strong>Consent:</strong> Where required, we obtain your consent before processing your personal data</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">International Data Transfers</h3>
                <p className="text-neutral-700 leading-relaxed">
                  Your information may be transferred to and processed in countries other than your own. Google Analytics data is processed on servers in the United States. We ensure that appropriate safeguards are in place to protect your personal data in accordance with GDPR requirements.
                </p>
              </div>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Children's Privacy</h2>
            
            <p className="text-neutral-700 leading-relaxed">
              Our website is not intended for children under the age of 16. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us so we can delete it.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Changes to This Privacy Policy</h2>
            
            <p className="text-neutral-700 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this policy. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <Mail className="w-6 h-6 text-neutral-900" />
              <h2 className="text-2xl font-bold text-neutral-900">Contact Us</h2>
            </div>
            
            <p className="text-neutral-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, or if you wish to exercise any of your rights regarding your personal data, please contact us:
            </p>
            
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
              <p className="text-neutral-700 leading-relaxed">
                <strong className="text-neutral-900">Email:</strong> privacy@trymandate.com
              </p>
              <p className="text-neutral-700 leading-relaxed mt-2">
                We will respond to your request within 30 days.
              </p>
            </div>
          </section>

          {/* Summary Box */}
          <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Privacy Policy Summary</h3>
            <ul className="space-y-2 text-neutral-700 text-sm">
              <li>✓ We use Google Analytics to understand website usage and improve user experience</li>
              <li>✓ IP addresses are automatically anonymized for privacy protection</li>
              <li>✓ We do not sell or share your personal information with third parties for marketing purposes</li>
              <li>✓ You can opt out of tracking at any time using browser settings or Google's opt-out tool</li>
              <li>✓ We are committed to GDPR compliance and protecting your privacy rights</li>
              <li>✓ Analytics data is retained for 14 months and then automatically deleted</li>
            </ul>
          </section>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
