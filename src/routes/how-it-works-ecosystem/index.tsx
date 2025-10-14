import { createFileRoute } from "@tanstack/react-router";
import { Header } from "~/components/ui/Header";
import { Footer } from "~/components/sections/Footer";
import { MandateEcosystemTable } from "~/components/sections/MandateEcosystemTable";
import { ScrollAnimationWrapper } from "~/components/ui/ScrollAnimationWrapper";
import { SEO } from "~/components/SEO";

export const Route = createFileRoute("/how-it-works-ecosystem/")({
  component: HowItWorksEcosystem,
});

function HowItWorksEcosystem() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How Mandate Works - Payment Ecosystem Integration",
    "description": "Understand how Mandate integrates with the payment ecosystem to prevent chargebacks",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Connect to Payment Networks",
        "text": "Integrate with Verifi, Ethoca, and your payment service provider"
      },
      {
        "@type": "HowToStep",
        "name": "Monitor Pre-Disputes",
        "text": "Automatically detect and analyze incoming dispute inquiries"
      },
      {
        "@type": "HowToStep",
        "name": "Take Action",
        "text": "Deflect, refund, or provide evidence based on intelligent rules"
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="How It Works - Payment Ecosystem | Mandate"
        description="Learn how Mandate integrates with the payment ecosystem including Verifi, Ethoca, card networks, and payment processors to prevent chargebacks before they happen."
        canonical="https://mandate.app/how-it-works-ecosystem"
        keywords="payment ecosystem, Verifi integration, Ethoca integration, chargeback workflow, dispute resolution process"
        structuredData={structuredData}
      />
      <Header />
      
      <ScrollAnimationWrapper variant="fade-in">
        <MandateEcosystemTable />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={100}>
        <Footer />
      </ScrollAnimationWrapper>
    </div>
  );
}
