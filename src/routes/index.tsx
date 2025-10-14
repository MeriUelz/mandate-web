import { createFileRoute } from "@tanstack/react-router";
import { SEO } from "~/components/SEO";
import { ScrollAnimationWrapper } from "~/components/ui/ScrollAnimationWrapper";
import { Header } from "~/components/ui/Header";
import { HighlightsHeader } from "~/components/sections/HighlightsHeader";
import { Hero } from "~/components/sections/Hero";
import { Problem } from "~/components/sections/Problem";
import { Solution } from "~/components/sections/Solution";
import { HowItWorks } from "~/components/sections/HowItWorks";
import { Benefits } from "~/components/sections/Benefits";
import { WhyUs } from "~/components/sections/WhyUs";
import { BuiltForSubscriptionMerchants } from "~/components/sections/BuiltForSubscriptionMerchants";
import { Integrations } from "~/components/sections/Integrations";
import { ROICalculator } from "~/components/sections/ROICalculator";
import { UseCases } from "~/components/sections/UseCases";
import { Security } from "~/components/sections/Security";
import { Testimonials } from "~/components/sections/Testimonials";
import { FAQ } from "~/components/sections/FAQ";
import { Footer } from "~/components/sections/Footer";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": "Mandate - Pre-Dispute Chargeback Prevention",
        "description": "Stop chargebacks before they happen with Mandate's pre-dispute autopilot for subscription businesses.",
        "url": "https://mandate.app/",
        "mainEntity": {
          "@type": "Service",
          "name": "Mandate Pre-Dispute Platform",
          "provider": {
            "@type": "Organization",
            "name": "Mandate"
          },
          "serviceType": "Chargeback Prevention",
          "areaServed": "Worldwide",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Chargeback Prevention Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Order Insight Integration",
                  "description": "Show itemized receipts and history in banking apps"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Rapid Dispute Resolution",
                  "description": "Auto-RDR under your rules before disputes formalize"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Evidence Generation",
                  "description": "Agent-aware evidence packs for dispute resolution"
                }
              }
            ]
          }
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Does this work if I already use smart retries?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We coordinate dunning/Updater with pre-dispute so you don't re-charge after RDR or confuse cardholders."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to switch PSPs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. We work on top of your current PSP(s). Our integration layer connects with Stripe, Chargebee, Recurly, Shopify, and others without requiring any changes to your existing setup."
            }
          },
          {
            "@type": "Question",
            "name": "Do you store card data?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No—PCI-light. We only use PSP IDs and order context. We never handle or store PAN, CVV, or any sensitive card data, which significantly reduces your compliance burden."
            }
          },
          {
            "@type": "Question",
            "name": "What about agent/AP2 orders?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We ingest mandate/agent_id/intent and add it to receipts and CE packs. This is crucial for agent-assisted purchases where clear consent documentation can make the difference in dispute resolution."
            }
          },
          {
            "@type": "Question",
            "name": "How quickly can I see results?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most customers see initial chargeback reduction within the first month. Full optimization typically occurs within 60-90 days as our machine learning models adapt to your specific business patterns."
            }
          },
          {
            "@type": "Question",
            "name": "What's the implementation timeline?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Integration typically takes 1-2 weeks depending on your PSP setup. We provide dedicated technical support and can often complete the integration in a few days for standard configurations."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Mandate - Pre-Dispute Chargeback Prevention for Subscriptions"
        description="Stop chargebacks before they happen with Mandate's pre-dispute autopilot. Orchestrate Verifi OI/RDR and Ethoca, generate agent-aware evidence, and reduce disputes without touching card data. PCI-light chargeback prevention for subscription businesses."
        canonical="https://mandate.app/"
        keywords="chargeback prevention, pre-dispute, subscription chargebacks, Verifi, Ethoca, RDR, Order Insight, dispute prevention, payment disputes, subscription billing"
        structuredData={structuredData}
      />
      <Header />
      <HighlightsHeader />
      
      <ScrollAnimationWrapper variant="fade-in">
        <Hero />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={100}>
        <Problem />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={150}>
        <Solution />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={100}>
        <HowItWorks />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={150}>
        <Benefits />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={100}>
        <WhyUs />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={150}>
        <BuiltForSubscriptionMerchants />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={100}>
        <Integrations />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={150}>
        <ROICalculator />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={100}>
        <UseCases />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={150}>
        <Security />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={100}>
        <Testimonials />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={150}>
        <FAQ />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={100}>
        <Footer />
      </ScrollAnimationWrapper>
    </div>
  );
}
