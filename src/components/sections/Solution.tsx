import React from 'react';
import { Container } from '~/components/ui/Container';
import { Shield, RefreshCw, Trophy, User, Lock } from 'lucide-react';

export function Solution() {
  const features = [
    {
      icon: Shield,
      title: 'Deflect',
      description: 'Show itemized receipts/history in the banking app (Order Insight / Consumer Clarity).'
    },
    {
      icon: RefreshCw,
      title: 'Refund when it pays off',
      description: 'Auto-RDR under your rules before it counts as a dispute.'
    },
    {
      icon: Trophy,
      title: 'Win with evidence',
      description: 'CE-style packs with history, device/IP, usage, address matches.'
    }
  ];

  const additionalFeatures = [
    {
      icon: User,
      title: 'Agent-aware',
      description: 'Attach mandate/intent/agent_id (AP2) to receipts and evidence.'
    },
    {
      icon: Lock,
      title: 'PCI-light',
      description: 'We never touch PAN/CVV; we operate on PSP IDs and order context.'
    }
  ];

  return (
    <section className="py-16 bg-white" aria-labelledby="solution-heading">
      <Container>
        <div className="text-center mb-12">
          <h2 id="solution-heading" className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            What we do
          </h2>
          <p className="text-lg md:text-xl font-medium text-neutral-700 mb-8">
            Pre-dispute orchestration + agent-aware evidence
          </p>
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div key={index} className="text-center p-6 rounded-2xl bg-neutral-50 hover:shadow-xl transition-all duration-300 border border-neutral-200">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-6 bg-neutral-100">
                  <Icon className="w-6 h-6 text-neutral-700" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-neutral-800 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {additionalFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-start space-x-6 p-6 rounded-xl bg-neutral-50 border border-neutral-200 hover:shadow-lg hover:bg-white transition-all duration-300">
                <div className="flex-shrink-0 w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-neutral-700" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-800 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
