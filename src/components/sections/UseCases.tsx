import React from 'react';
import { Container } from '~/components/ui/Container';
import { PlayCircle, RefreshCw, UserCheck } from 'lucide-react';

export function UseCases() {
  const useCases = [
    {
      icon: PlayCircle,
      title: 'Trial → first payment',
      description: 'enriched receipt + smart RDR for low-tenure customers.'
    },
    {
      icon: RefreshCw,
      title: 'Renewal #1/#2',
      description: 'deflect with prior-payment history; escalate to CE if needed.'
    },
    {
      icon: UserCheck,
      title: 'Agent orders',
      description: 'include agent receipt and AP2 mandate in pre-dispute/evidence.'
    }
  ];

  return (
    <section className="py-16 bg-neutral-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            Subscription use cases
          </h2>
          <p className="text-lg text-neutral-800 max-w-3xl mx-auto">
            Tailored strategies for every stage of the subscription lifecycle
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            
            return (
              <div key={index} className="bg-white rounded-2xl p-8 border border-neutral-200 hover:shadow-xl transition-all duration-300 hover:border-neutral-300">
                <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-neutral-700" />
                </div>
                
                <h3 className="text-xl font-bold text-neutral-900 mb-4">
                  {useCase.title}
                </h3>
                
                <p className="text-neutral-800 leading-relaxed text-base">
                  {useCase.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional context */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto border border-neutral-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-default">
            <h3 className="text-xl font-bold text-neutral-900 mb-4">
              Smart Context Awareness
            </h3>
            <p className="text-neutral-800 leading-relaxed text-base">
              Our system understands the nuances of subscription billing patterns, customer tenure, 
              and payment history to make intelligent pre-dispute decisions that maximize success rates 
              while minimizing unnecessary refunds.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
