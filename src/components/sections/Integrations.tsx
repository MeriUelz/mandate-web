import React from 'react';
import { Container } from '~/components/ui/Container';
import { Plug, ArrowRight } from 'lucide-react';

export function Integrations() {
  const billingProviders = [
    { name: 'Stripe Billing' },
    { name: 'Chargebee' },
    { name: 'Recurly' },
    { name: 'Shopify' }
  ];

  const preDisputeProviders = [
    { name: 'Verifi' },
    { name: 'Ethoca' }
  ];

  return (
    <section className="py-12 bg-white" aria-labelledby="integrations-heading">
      <Container>
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-neutral-100 rounded-full mb-6">
            <Plug className="w-6 h-6 text-neutral-700" aria-hidden="true" />
          </div>
          <h2 id="integrations-heading" className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            Integrations
          </h2>
          <p className="text-xl md:text-2xl font-medium text-neutral-700 mb-4">
            Plug in and go
          </p>
          <p className="text-lg text-neutral-800 max-w-3xl mx-auto mb-12">
            Stripe Billing, Chargebee, Recurly, Shopify for events; Verifi and Ethoca for pre-dispute. 
            Add more PSPs anytime.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Billing Providers */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-neutral-900 mb-6 text-center">
              Billing & Events
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {billingProviders.map((provider, index) => (
                <div key={index} className="bg-neutral-50 rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 border border-neutral-200 hover:border-neutral-300">
                  <h4 className="font-semibold text-neutral-900">{provider.name}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center mb-8">
            <div className="bg-neutral-100 rounded-full p-4">
              <ArrowRight className="w-6 h-6 text-neutral-700" aria-hidden="true" />
            </div>
          </div>

          {/* Pre-dispute Providers */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-neutral-900 mb-6 text-center">
              Pre-dispute Networks
            </h3>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {preDisputeProviders.map((provider, index) => (
                <div key={index} className="bg-neutral-50 rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 border border-neutral-200 hover:border-neutral-300">
                  <h4 className="font-semibold text-neutral-900">{provider.name}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Integration Benefits */}
          <div className="bg-neutral-50 rounded-2xl p-8 text-center border border-neutral-200">
            <h3 className="text-lg font-bold text-neutral-900 mb-6">
              Seamless Integration
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="font-semibold text-neutral-900 mb-3">No Code Changes</div>
                <div className="text-neutral-800">Works with your existing checkout</div>
              </div>
              <div>
                <div className="font-semibold text-neutral-900 mb-3">API-First</div>
                <div className="text-neutral-800">RESTful APIs for custom integrations</div>
              </div>
              <div>
                <div className="font-semibold text-neutral-900 mb-3">Real-time Sync</div>
                <div className="text-neutral-800">Instant updates to your CRM/support</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
