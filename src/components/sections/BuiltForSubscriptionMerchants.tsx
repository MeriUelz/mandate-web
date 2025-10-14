import React from 'react';
import { Container } from '~/components/ui/Container';

export function BuiltForSubscriptionMerchants() {
  return (
    <section className="py-12 bg-gradient-to-b from-neutral-50 to-white">
      <Container>
        <div className="text-center">
          <div className="inline-block bg-white rounded-3xl shadow-2xl p-10 max-w-3xl border-2 border-blue-100 hover:shadow-3xl hover:scale-105 transition-all duration-500 cursor-default backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6 leading-tight">
              Built for subscription merchants, by subscription experts
            </h3>
            <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
              We understand the unique challenges of recurring billing, agent orders, 
              and the delicate balance between fraud prevention and customer experience.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
