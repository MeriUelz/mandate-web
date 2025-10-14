import React from 'react';
import { Container } from '~/components/ui/Container';
import { Target, Layers, Users, DollarSign, Zap } from 'lucide-react';

export function WhyUs() {
  const features = [
    {
      icon: Target,
      title: 'Not another subscription tool. Your decision layer.',
      description: 'We integrate with your existing stack, not replace it.'
    },
    {
      icon: Layers,
      title: 'Multi-PSP, multi-program',
      description: 'Verifi OI/RDR + Ethoca from one policy engine.'
    },
    {
      icon: Users,
      title: 'Agent/AP2-ready',
      description: 'Turn agent mandates into evidence that actually closes cases.'
    },
    {
      icon: DollarSign,
      title: 'Merchant economics first',
      description: 'Rules by amount, LTV, tenure, BIN/geo—not generic defaults.'
    },
    {
      icon: Zap,
      title: 'Days to value',
      description: 'No checkout changes. PCI-light by design.'
    }
  ];

  return (
    <section className="py-16 bg-neutral-50" aria-labelledby="why-us-heading">
      <Container>
        <div className="text-center mb-12">
          <h2 id="why-us-heading" className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            Why us
          </h2>
          <p className="text-xl md:text-2xl font-medium text-neutral-700 mb-6">
            Not another subscription tool. Your decision layer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <div key={index} className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-200">
                <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-neutral-700" aria-hidden="true" />
                </div>
                
                <h3 className="text-lg font-bold text-neutral-900 mb-4 leading-tight">
                  {feature.title}
                </h3>
                
                <p className="text-neutral-800 leading-relaxed text-base">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
