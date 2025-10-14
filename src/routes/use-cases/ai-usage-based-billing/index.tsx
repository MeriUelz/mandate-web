import { createFileRoute } from "@tanstack/react-router";
import { Header } from "~/components/ui/Header";
import { Footer } from "~/components/sections/Footer";
import { ScrollAnimationWrapper } from "~/components/ui/ScrollAnimationWrapper";
import { Container } from "~/components/ui/Container";
import { Button } from "~/components/ui/Button";
import { Radio, Zap, CreditCard, TrendingUp, CheckCircle, Shield, ArrowRight } from "lucide-react";
import { SEO } from "~/components/SEO";

export const Route = createFileRoute("/use-cases/ai-usage-based-billing/")({
  component: UseCasesPage,
});

function UseCasesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Usage-Based Billing Chargeback Prevention",
    "provider": {
      "@type": "Organization",
      "name": "Mandate"
    },
    "serviceType": "Chargeback Prevention",
    "description": "Stop AI usage-based chargebacks before they start with PCI-light pre-dispute autopilot",
    "areaServed": "Worldwide",
    "audience": {
      "@type": "Audience",
      "audienceType": "AI and SaaS companies with usage-based billing"
    },
    "offers": {
      "@type": "Offer",
      "description": "Pre-dispute autopilot for AI and usage-based billing services"
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="AI Usage-Based Billing Chargeback Prevention | Mandate"
        description="Stop AI usage-based chargebacks before they start. PCI-light pre-dispute autopilot that restores context, resolves disputes early, and keeps usage charges from becoming chargebacks. Perfect for API services, AI platforms, and consumption-based pricing."
        canonical="https://mandate.app/use-cases/ai-usage-based-billing"
        keywords="AI chargeback prevention, usage-based billing disputes, API billing chargebacks, consumption pricing disputes, AI platform chargebacks, variable billing disputes"
        structuredData={structuredData}
      />
      <Header />
      
      <ScrollAnimationWrapper variant="fade-in">
        <HeroSection />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={100}>
        <WhyThisSegmentSection />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={150}>
        <WhatMandateDoesSection />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={100}>
        <TargetOutcomesSection />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={150}>
        <TrustAndScopeSection />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={100}>
        <CTASection />
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
          <div className="inline-flex items-center px-4 py-2 bg-neutral-100 rounded-full mb-6">
            <Zap className="w-4 h-4 mr-2 text-neutral-700" />
            <span className="text-sm font-medium text-neutral-700">AI & Usage-Based Billing</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            Stop AI usage-based chargebacks before they start
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed">
            A PCI-light pre-dispute autopilot that restores context, resolves the obvious early, 
            and keeps usage charges from becoming chargebacks—without touching card data.
          </p>
        </div>
      </Container>
    </section>
  );
}

function WhyThisSegmentSection() {
  const painPoints = [
    {
      icon: TrendingUp,
      title: "Hype sign-ups → end-of-month charges users don't recognize",
      description: "Customers excited by AI hype sign up quickly, then forget about the service when the first bill arrives weeks later."
    },
    {
      icon: CreditCard,
      title: "Variable amounts feel like \"mystery\" charges",
      description: "Usage-based pricing means every charge is different, making legitimate bills look suspicious to cardholders."
    },
    {
      icon: Radio,
      title: "Intangible deliverables (\"I didn't use it\") and one-tap disputes",
      description: "API calls and AI tokens are invisible to end users, making it easy to dispute with a single tap on their banking app."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 text-center">
            Why this segment bleeds
          </h2>
          <p className="text-lg text-neutral-600 mb-12 text-center max-w-2xl mx-auto">
            AI and usage-based services face unique chargeback challenges that traditional dispute prevention can't handle.
          </p>
          
          <div className="space-y-6">
            {painPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <div 
                  key={index} 
                  className="bg-neutral-50 rounded-2xl p-6 md:p-8 border border-neutral-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 border border-neutral-200">
                      <Icon className="w-6 h-6 text-neutral-700" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">
                        {point.title}
                      </h3>
                      <p className="text-neutral-700 leading-relaxed">
                        {point.description}
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

function WhatMandateDoesSection() {
  const steps = [
    {
      number: "01",
      title: "Listen",
      description: "Connect to PSP/billing + issuer rails (Visa OI/RDR, Ethoca)",
      detail: "We plug into your existing payment infrastructure and issuer networks to monitor disputes in real-time."
    },
    {
      number: "02",
      title: "Decide",
      description: "Detect likely unrecognized usage (trial→paid flips, spikes, card updates)",
      detail: "Our AI identifies high-risk patterns like trial conversions, usage spikes, and card changes that often lead to disputes."
    },
    {
      number: "03",
      title: "Act",
      description: "Send issuer/cardholder context or credit low-signal cases early via RDR; if needed, assemble issuer-ready evidence—before it formalizes",
      detail: "We proactively provide context to cardholders and issuers, or strategically issue credits before disputes become formal chargebacks."
    },
    {
      number: "04",
      title: "Prove",
      description: "Track disputes per 1k charges, CPD, and time-to-clarity",
      detail: "Measure what matters: dispute rates, cost per dispute, and how quickly issues get resolved."
    }
  ];

  return (
    <section className="py-16 bg-neutral-50">
      <Container>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 text-center">
            What Mandate does
          </h2>
          <p className="text-lg text-neutral-600 mb-12 text-center max-w-2xl mx-auto">
            Four-step autopilot that stops chargebacks before they become formal disputes.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200 hover:shadow-xl transition-all duration-300 hover:border-neutral-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-3xl font-bold text-neutral-300">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-neutral-900 font-medium mb-3">
                      {step.description}
                    </p>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function TargetOutcomesSection() {
  const outcomes = [
    "Fewer formal cases on low-ticket usage renewals",
    "Lower CPD (fees + team minutes) through early deflection",
    "Faster time-to-clarity for issuers and cardholders"
  ];

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8 text-center">
            Target outcomes
          </h2>
          
          <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl p-8 md:p-12 border border-neutral-200">
            <div className="space-y-6">
              {outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-lg text-neutral-900 font-medium">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function TrustAndScopeSection() {
  return (
    <section className="py-16 bg-neutral-50">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-neutral-200 shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              <Shield className="w-8 h-8 text-neutral-700 flex-shrink-0" />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                  Trust & scope
                </h2>
                <p className="text-lg text-neutral-700 leading-relaxed mb-4">
                  <span className="font-semibold">PCI-light</span> (token-in/token-out). 
                  Multi-PSP, multi-network policies that fit your existing stack.
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  We never touch raw card data. Our system works with tokenized payment information 
                  and integrates seamlessly with your current payment service provider and dispute networks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            Ready to protect your usage-based revenue?
          </h2>
          <p className="text-lg text-neutral-700 mb-8 max-w-2xl mx-auto">
            See how Mandate can help you stop chargebacks before they start.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/how-it-works-ecosystem"
              className="inline-flex items-center justify-center"
            >
              <Button variant="secondary" size="lg">
                See how it works
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <a 
              href="https://calendar.app.google/MuyapKxcpQXibsto7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center"
            >
              <Button variant="primary" size="lg">
                Book a 15-minute assessment
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
