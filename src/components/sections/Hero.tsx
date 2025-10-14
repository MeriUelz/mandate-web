import React from 'react';
import { Button } from '~/components/ui/Button';
import { Container } from '~/components/ui/Container';
import { Play } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-white py-16 overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-neutral-50 rounded-full blur-3xl opacity-30 -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neutral-50 rounded-full blur-3xl opacity-30 translate-y-48 -translate-x-48"></div>
      
      <Container>
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            Stop chargebacks
            <span className="text-neutral-700">
              {" "}before they happen
            </span>
          </h1>
          
          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-neutral-800 mb-8 leading-relaxed max-w-4xl mx-auto">
            Pre-dispute autopilot for subscriptions. Orchestrate Verifi OI/RDR and Ethoca, 
            generate agent-aware evidence, and cut disputes—without touching card data.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <a 
              href="https://calendar.app.google/MuyapKxcpQXibsto7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-neutral-900 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 transition-colors w-full sm:w-auto"
            >
              Book a demo
            </a>
            <Button variant="outline" size="xl" className="w-full sm:w-auto">
              <Play className="w-5 h-5 mr-2" />
              See how it works
            </Button>
          </div>
          
          {/* Trust Strip */}
          <div className="border-t border-neutral-200 pt-8">
            <p className="text-sm text-neutral-700 mb-6 font-medium tracking-wide uppercase">
              WORKS WITH
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center hover:opacity-100 transition-all duration-300 cursor-default hover:scale-105">
                <span className="font-medium text-neutral-800">Stripe Billing</span>
              </div>
              <div className="flex items-center hover:opacity-100 transition-all duration-300 cursor-default hover:scale-105">
                <span className="font-medium text-neutral-800">Chargebee</span>
              </div>
              <div className="flex items-center hover:opacity-100 transition-all duration-300 cursor-default hover:scale-105">
                <span className="font-medium text-neutral-800">Recurly</span>
              </div>
              <div className="flex items-center hover:opacity-100 transition-all duration-300 cursor-default hover:scale-105">
                <span className="font-medium text-neutral-800">Shopify</span>
              </div>
              <div className="flex items-center hover:opacity-100 transition-all duration-300 cursor-default hover:scale-105">
                <span className="font-medium text-neutral-800">Verifi</span>
              </div>
              <div className="flex items-center hover:opacity-100 transition-all duration-300 cursor-default hover:scale-105">
                <span className="font-medium text-neutral-800">Ethoca</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
