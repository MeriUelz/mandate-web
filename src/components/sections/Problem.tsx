import React from 'react';
import { Container } from '~/components/ui/Container';
import { AlertTriangle } from 'lucide-react';

export function Problem() {
  return (
    <section className="py-16 bg-neutral-50" aria-labelledby="problem-heading">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-neutral-100 rounded-full mb-8">
            <AlertTriangle className="w-6 h-6 text-neutral-700" aria-hidden="true" />
          </div>
          
          <h2 id="problem-heading" className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            Problem
          </h2>
          
          <h3 className="text-xl md:text-2xl font-semibold text-neutral-800 mb-8">
            The silent tax on subscriptions
          </h3>
          
          <div className="text-left bg-white rounded-2xl p-8 shadow-lg border border-neutral-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-default">
            <blockquote className="text-lg md:text-xl text-neutral-800 italic mb-6 border-l-4 border-neutral-300 pl-6">
              "I don't recognize this charge."
            </blockquote>
            
            <p className="text-base text-neutral-800 leading-relaxed">
              In subscriptions, that moment triggers costs, ops time, and churn. Networks offer 
              pre-dispute rails, but no one chooses the right action per case—or injects the right 
              evidence in time (especially for agent/AP2 orders).
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
