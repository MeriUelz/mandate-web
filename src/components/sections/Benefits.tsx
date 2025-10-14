import React from 'react';
import { Container } from '~/components/ui/Container';
import { TrendingDown, Clock, UserMinus, Shield } from 'lucide-react';

export function Benefits() {
  const benefits = [
    {
      icon: TrendingDown,
      title: 'Chargeback rate ↓ and fees ↓',
      description: 'from month one.',
      metric: '65%'
    },
    {
      icon: Clock,
      title: 'Time-to-resolution ↓',
      description: 'with standardized evidence.',
      metric: '40%'
    },
    {
      icon: UserMinus,
      title: 'Involuntary churn ↓',
      description: 'by coordinating Updater/retries with pre-dispute decisions.',
      metric: '25%'
    },
    {
      icon: Shield,
      title: 'Compliance confidence ↑',
      description: '(clear consent trail, agent mandates when present).',
      metric: '100%'
    }
  ];

  return (
    <section className="py-16 bg-white" aria-labelledby="benefits-heading">
      <Container>
        <div className="text-center mb-12">
          <h2 id="benefits-heading" className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            Benefits
          </h2>
          <p className="text-lg text-neutral-800 max-w-3xl mx-auto">
            Measurable improvements from day one
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            
            return (
              <div key={index} className="text-center p-6 rounded-2xl bg-neutral-50 hover:shadow-xl transition-all duration-300 border border-neutral-200">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-6 bg-neutral-100">
                  <Icon className="w-6 h-6 text-neutral-700" aria-hidden="true" />
                </div>
                
                <div className="text-3xl font-bold mb-4 text-neutral-900">
                  {benefit.metric}
                </div>
                
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                  {benefit.title}
                </h3>
                
                <p className="text-neutral-800 leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
