import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "~/components/ui/Header";
import { Footer } from "~/components/sections/Footer";
import { ScrollAnimationWrapper } from "~/components/ui/ScrollAnimationWrapper";
import { Container } from "~/components/ui/Container";
import { Button } from "~/components/ui/Button";
import { SEO } from "~/components/SEO";
import { 
  Zap, 
  PlayCircle, 
  RefreshCw, 
  UserCheck, 
  ShoppingCart,
  Tv,
  Building2,
  Smartphone,
  CreditCard,
  ArrowRight,
  Sparkles
} from "lucide-react";

export const Route = createFileRoute("/use-cases/")({
  component: UseCasesIndexPage,
});

function UseCasesIndexPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Mandate Use Cases by Industry",
    "description": "Chargeback prevention solutions tailored to different industries and business models",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Service",
          "name": "AI & Usage-Based Billing",
          "description": "Stop chargebacks on variable AI usage charges before they formalize",
          "url": "https://mandate.app/use-cases/ai-usage-based-billing"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Service",
          "name": "Subscription Renewals",
          "description": "Deflect renewal disputes with prior-payment history"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Service",
          "name": "E-Commerce Subscriptions",
          "description": "Protect recurring product deliveries with delivery confirmations"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Use Cases - Industry Solutions | Mandate"
        description="Explore how Mandate helps businesses across different industries stop chargebacks before they start. Solutions for AI/SaaS, subscriptions, e-commerce, streaming, B2B, mobile apps, and fintech."
        canonical="https://mandate.app/use-cases"
        keywords="chargeback prevention use cases, subscription chargeback solutions, SaaS dispute prevention, e-commerce chargebacks, AI billing disputes"
        structuredData={structuredData}
      />
      <Header />
      
      <ScrollAnimationWrapper variant="fade-in">
        <HeroSection />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={100}>
        <UseCasesGrid />
      </ScrollAnimationWrapper>
      
      <ScrollAnimationWrapper variant="fade-up" delay={150}>
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
            <Sparkles className="w-4 h-4 mr-2 text-neutral-700" />
            <span className="text-sm font-medium text-neutral-700">Industry Use Cases</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            Chargeback prevention tailored to your industry
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed">
            Explore how Mandate helps businesses across different industries stop chargebacks 
            before they start, with context-aware strategies for every use case.
          </p>
        </div>
      </Container>
    </section>
  );
}

function UseCasesGrid() {
  const useCases = [
    {
      icon: Zap,
      title: "AI & Usage-Based Billing",
      description: "Stop chargebacks on variable AI usage charges before they formalize. Perfect for API services, AI platforms, and consumption-based pricing models.",
      industry: "AI/SaaS",
      link: "/use-cases/ai-usage-based-billing",
      available: true,
      color: "bg-purple-50 border-purple-200"
    },
    {
      icon: PlayCircle,
      title: "Trial to First Payment",
      description: "Reduce disputes when free trials convert to paid subscriptions. Enriched receipts and smart RDR for low-tenure customers who forgot they signed up.",
      industry: "Subscription",
      link: "#",
      available: false,
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: RefreshCw,
      title: "Subscription Renewals",
      description: "Deflect renewal disputes with prior-payment history. Automatically escalate to customer success when needed, reducing involuntary churn.",
      industry: "Subscription",
      link: "#",
      available: false,
      color: "bg-green-50 border-green-200"
    },
    {
      icon: UserCheck,
      title: "Agent-Assisted Orders",
      description: "Include agent receipts and AP2 mandates in pre-dispute evidence. Perfect for call center sales and telesales operations.",
      industry: "Enterprise",
      link: "#",
      available: false,
      color: "bg-orange-50 border-orange-200"
    },
    {
      icon: ShoppingCart,
      title: "E-Commerce Subscriptions",
      description: "Protect recurring product deliveries with delivery confirmations and purchase history. Reduce 'item not received' disputes.",
      industry: "E-Commerce",
      link: "#",
      available: false,
      color: "bg-pink-50 border-pink-200"
    },
    {
      icon: Tv,
      title: "Streaming & Media Services",
      description: "Handle family sharing disputes and forgotten subscriptions with usage data and viewing history evidence.",
      industry: "Media",
      link: "#",
      available: false,
      color: "bg-indigo-50 border-indigo-200"
    },
    {
      icon: Building2,
      title: "B2B SaaS Platforms",
      description: "Manage multi-seat licenses and annual contract disputes with company-level evidence and admin approval trails.",
      industry: "Enterprise",
      link: "#",
      available: false,
      color: "bg-cyan-50 border-cyan-200"
    },
    {
      icon: Smartphone,
      title: "Mobile App Subscriptions",
      description: "Reduce app store subscription disputes with in-app activity logs and feature usage data.",
      industry: "Mobile",
      link: "#",
      available: false,
      color: "bg-teal-50 border-teal-200"
    },
    {
      icon: CreditCard,
      title: "Payment Processing Platforms",
      description: "Help your merchants reduce their chargeback rates with integrated pre-dispute automation and evidence assembly.",
      industry: "Fintech",
      link: "#",
      available: false,
      color: "bg-amber-50 border-amber-200"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Browse by industry
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Select a use case to learn how Mandate can help protect your revenue
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              const CardWrapper = useCase.available ? Link : 'div';
              const cardProps = useCase.available ? { to: useCase.link } : {};
              
              return (
                <CardWrapper
                  key={index}
                  {...cardProps}
                  className={`
                    ${useCase.color}
                    rounded-2xl p-6 border-2 transition-all duration-300
                    ${useCase.available 
                      ? 'hover:shadow-xl hover:scale-[1.02] cursor-pointer hover:border-neutral-400' 
                      : 'opacity-75 cursor-not-allowed'
                    }
                  `}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-neutral-200 shadow-sm">
                      <Icon className="w-6 h-6 text-neutral-700" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 bg-white rounded-full text-neutral-700 border border-neutral-200">
                      {useCase.industry}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">
                    {useCase.title}
                  </h3>
                  
                  <p className="text-neutral-700 leading-relaxed text-sm mb-4">
                    {useCase.description}
                  </p>

                  {useCase.available ? (
                    <div className="flex items-center text-neutral-900 font-medium text-sm">
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  ) : (
                    <div className="text-neutral-500 text-sm font-medium">
                      Coming soon
                    </div>
                  )}
                </CardWrapper>
              );
            })}
          </div>

          {/* Additional info section */}
          <div className="mt-12 text-center">
            <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200 max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Don't see your industry?
              </h3>
              <p className="text-neutral-700 leading-relaxed mb-6">
                Mandate's flexible platform adapts to any subscription or recurring billing model. 
                Book a call to discuss your specific use case and how we can help.
              </p>
              <a 
                href="https://calendar.app.google/MuyapKxcpQXibsto7"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="lg">
                  Schedule a consultation
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-16 bg-neutral-50">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            Ready to reduce your chargeback rate?
          </h2>
          <p className="text-lg text-neutral-700 mb-8 max-w-2xl mx-auto">
            See how Mandate's pre-dispute autopilot can protect your revenue across 
            every stage of the customer lifecycle.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/how-it-works-ecosystem">
              <Button variant="secondary" size="lg">
                See how it works
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a 
              href="https://calendar.app.google/MuyapKxcpQXibsto7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="lg">
                Book a demo
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
