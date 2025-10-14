import { createFileRoute } from "@tanstack/react-router";
import { Header } from "~/components/ui/Header";
import { Footer } from "~/components/sections/Footer";
import { ScrollAnimationWrapper } from "~/components/ui/ScrollAnimationWrapper";
import { Container } from "~/components/ui/Container";
import { Button } from "~/components/ui/Button";
import { Settings, Zap, Rocket, Shield, Lock, Activity, CheckCircle, ArrowRight, Clock, Gauge } from "lucide-react";
import { SEO } from "~/components/SEO";

export const Route = createFileRoute("/developers/")({
  component: DevelopersPage,
});

function DevelopersPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Developer Integration Guide - Mandate",
    "description": "Choose how deep you integrate with Mandate. Start in hours with zero-integration mode, or scale to milliseconds with our full API.",
    "author": {
      "@type": "Organization",
      "name": "Mandate"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mandate",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mandate.app/logo.png"
      }
    },
    "about": {
      "@type": "SoftwareApplication",
      "name": "Mandate API",
      "applicationCategory": "DeveloperApplication",
      "description": "PCI-light chargeback prevention API"
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Developers - Integration Guide | Mandate"
        description="Choose how deep you integrate with Mandate. Start in hours with zero-integration mode, move to light connectors, or scale to milliseconds with our full real-time API. PCI-light by design, secure by default."
        canonical="https://mandate.app/developers"
        keywords="payment API, chargeback API, dispute prevention API, PCI compliance, developer integration, webhook integration, REST API"
        structuredData={structuredData}
      />
      <Header />
      
      <ScrollAnimationWrapper variant="fade-in">
        <HeroSection />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={100}>
        <IntegrationModesSection />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={150}>
        <SecuritySection />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={100}>
        <ComparisonTableSection />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={150}>
        <FinalCTASection />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={100}>
        <Footer />
      </ScrollAnimationWrapper>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-b from-neutral-50 to-white">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            Choose how deep you integrate — start in hours, scale to milliseconds.
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed">
            Mandate lets you prevent and resolve chargebacks without touching card data.
            <br />
            Start no-code, move to APIs when you need full control. Always PCI-light.
          </p>
        </div>
      </Container>
    </section>
  );
}

function IntegrationModesSection() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Mode 1: Zero-Integration */}
          <div className="mb-16 pb-16 border-b border-neutral-200">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Settings className="w-8 h-8 text-neutral-700" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
                  1. Zero-Integration Mode — "Operator"
                </h2>
                <div className="flex flex-wrap gap-4 text-sm text-neutral-600 mb-4">
                  <span className="font-medium">Best for: fast pilots, compliance or data-access constraints.</span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Time to live: &lt;1 day.
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-50 rounded-2xl p-8 md:p-10 mb-6">
              <p className="text-lg font-semibold text-neutral-900 mb-6">
                Mandate works even if you can't ship code right now.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-700">Plug your PSP inbox or CSV exports.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-700">Our secure operator connects to your billing and dispute portals.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-700">You get deflection reports, evidence, and early-credit automations—no SDKs, no webhooks.</span>
                </li>
              </ul>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <p className="font-semibold text-neutral-900 mb-1">Why it matters:</p>
                    <p className="text-neutral-700">
                      Business teams can start seeing reduced chargebacks today while engineering stays focused on core work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <Button variant="primary" size="lg">
              → Start API-less Pilot
            </Button>
          </div>

          {/* Mode 2: Light Connectors */}
          <div className="mb-16 pb-16 border-b border-neutral-200">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Zap className="w-8 h-8 text-neutral-700" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
                  2. Light Connectors — "Token-in / Token-out"
                </h2>
                <div className="flex flex-wrap gap-4 text-sm text-neutral-600 mb-4">
                  <span className="font-medium">Best for: most teams.</span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Time to live: &lt;1 hour.
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-50 rounded-2xl p-8 md:p-10 mb-6">
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-700">
                    Authenticate Mandate with your PSP or billing provider (Stripe, Adyen, Recurly, Chargebee…).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-700">
                    We fetch events and return pre-dispute actions via a single webhook.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-700">
                    Everything runs token-in/token-out—no PAN, no PCI headache.
                  </span>
                </li>
              </ul>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 border border-neutral-200">
                  <p className="font-medium text-neutral-900">OAuth setup or API key</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-neutral-200">
                  <p className="font-medium text-neutral-900">Single Mandate webhook</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-neutral-200">
                  <p className="font-medium text-neutral-900">Immediate insights</p>
                </div>
              </div>
              
              <p className="text-neutral-700 mb-6">
                Immediate insights: dispute risk maps, renewal ambiguity, "unrecognized" cohorts
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⚙️</span>
                  <div>
                    <p className="font-semibold text-neutral-900 mb-1">Why devs love it:</p>
                    <p className="text-neutral-700">
                      Ship with confidence. Production-grade infrastructure, developer-first APIs, built to scale from day one.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <Button variant="primary" size="lg">
              → Connect your stack
            </Button>
          </div>

          {/* Mode 3: Full Real-Time API */}
          <div className="mb-8">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Rocket className="w-8 h-8 text-neutral-700" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
                  3. Full Real-Time API — "Complete Control"
                </h2>
                <div className="flex flex-wrap gap-4 text-sm text-neutral-600 mb-4">
                  <span className="font-medium">Best for: high-volume, latency-sensitive use cases.</span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Time to live: few hours to deploy.
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-50 rounded-2xl p-8 md:p-10 mb-6">
              <p className="text-lg text-neutral-900 mb-6">
                Use Mandate's API to send charge events and receive pre-dispute decisions in real time:
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="bg-neutral-900 text-white rounded-lg p-4 font-mono text-sm">
                  <span className="text-blue-300">/decisions</span> — get recommended action (OI, RDR, credit, hold)
                </div>
                <div className="bg-neutral-900 text-white rounded-lg p-4 font-mono text-sm">
                  <span className="text-blue-300">/evidence</span> — generate issuer-ready payloads (agent-aware)
                </div>
                <div className="bg-neutral-900 text-white rounded-lg p-4 font-mono text-sm">
                  <span className="text-blue-300">/metrics</span> — query CPD, VAMP, and time-to-clarity
                </div>
              </div>
              
              <p className="text-neutral-700 mb-6">
                Run with millisecond latency via webhooks or streaming.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🧠</span>
                  <div>
                    <p className="text-neutral-700">
                      Built with Temporal, pgvector, and XGBoost models for learned policies per BIN/issuer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <Button variant="primary" size="lg">
              → Read API Docs
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

function SecuritySection() {
  const features = [
    {
      icon: Shield,
      title: "PCI-light by design",
      description: "token-in/token-out, no PAN/CVV ever."
    },
    {
      icon: Lock,
      title: "Secure by default",
      description: "AWS KMS, HMAC-signed webhooks, private VPCs, audit logs."
    },
    {
      icon: Activity,
      title: "Observable",
      description: "OpenTelemetry traces for every decision."
    },
    {
      icon: Gauge,
      title: "Fast",
      description: "async jobs (SNS/SQS), outbox pattern, retries, <200ms avg latency in full-API mode."
    }
  ];

  return (
    <section className="py-16 bg-neutral-50">
      <Container>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 text-center">
            Security & Performance
          </h2>
          <p className="text-lg text-neutral-600 mb-12 text-center max-w-2xl mx-auto">
            Built with security and speed at the core.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-neutral-700" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-neutral-700">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ComparisonTableSection() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 text-center">
            How developers use Mandate
          </h2>
          <p className="text-lg text-neutral-600 mb-12 text-center max-w-2xl mx-auto">
            Choose the integration level that fits your needs.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-neutral-900 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Integration level</th>
                  <th className="px-6 py-4 text-left font-semibold">Setup time</th>
                  <th className="px-6 py-4 text-left font-semibold">Tech demand</th>
                  <th className="px-6 py-4 text-left font-semibold">Latency</th>
                  <th className="px-6 py-4 text-left font-semibold">Control</th>
                  <th className="px-6 py-4 text-left font-semibold">Typical use</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-neutral-900">Operator (no code)</td>
                  <td className="px-6 py-4 text-neutral-700">&lt;1 day</td>
                  <td className="px-6 py-4 text-neutral-700">★☆☆</td>
                  <td className="px-6 py-4 text-neutral-700">Hours</td>
                  <td className="px-6 py-4 text-neutral-700">Medium</td>
                  <td className="px-6 py-4 text-neutral-700">Fast pilots, early validation</td>
                </tr>
                <tr className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors bg-blue-50">
                  <td className="px-6 py-4 font-medium text-neutral-900">Light Connectors</td>
                  <td className="px-6 py-4 text-neutral-700">&lt;1 hour</td>
                  <td className="px-6 py-4 text-neutral-700">★★☆</td>
                  <td className="px-6 py-4 text-neutral-700">Minutes</td>
                  <td className="px-6 py-4 text-neutral-700">High</td>
                  <td className="px-6 py-4 text-neutral-700">Most teams, PCI-light default</td>
                </tr>
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-neutral-900">Full API</td>
                  <td className="px-6 py-4 text-neutral-700">few hours</td>
                  <td className="px-6 py-4 text-neutral-700">★★★</td>
                  <td className="px-6 py-4 text-neutral-700">Seconds</td>
                  <td className="px-6 py-4 text-neutral-700">Full</td>
                  <td className="px-6 py-4 text-neutral-700">High-volume or enterprise</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="py-16 bg-neutral-50">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            Start where you are. Scale when you're ready.
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="primary" size="lg">
              Get sandbox access
            </Button>
            <a 
              href="https://calendar.app.google/MuyapKxcpQXibsto7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="lg">
                Book a 15-min walkthrough
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
