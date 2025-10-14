import React from 'react';
import { Container } from '~/components/ui/Container';
import { Button } from '~/components/ui/Button';
import { Ear, Settings, Zap, ArrowRight } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: Ear,
      number: '01',
      title: 'Listen',
      description: 'Listen to Billing/PSP events + Verifi/Ethoca alerts.'
    },
    {
      icon: Settings,
      number: '02', 
      title: 'Decide',
      description: 'Decide per policy: Respond with data, RDR refund, or Prepare evidence.'
    },
    {
      icon: Zap,
      number: '03',
      title: 'Act',
      description: 'Act through the right channel and sync outcomes to your CRM/support.'
    }
  ];

  return (
    <section className="py-16 bg-neutral-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            How it works
          </h2>
          <p className="text-lg text-neutral-800">
            3 simple steps to chargeback prevention
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-neutral-200 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center group hover:scale-105 transition-all duration-300">
                  <div className="relative mb-8">
                    <div className="w-16 h-16 bg-white rounded-full shadow-lg border-2 border-neutral-200 flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl group-hover:border-neutral-300 transition-all duration-300">
                      <Icon className="w-6 h-6 text-neutral-700 group-hover:text-neutral-900 transition-colors duration-300" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-neutral-700 text-white rounded-full flex items-center justify-center text-xs font-bold group-hover:bg-neutral-900 transition-colors duration-300">
                      {step.number}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-neutral-900 mb-4 group-hover:text-neutral-700 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-neutral-800 leading-relaxed max-w-sm mx-auto text-base">
                    {step.description}
                  </p>
                  
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-8 mb-8">
                      <ArrowRight className="w-6 h-6 text-neutral-600" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Inline CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View the flow
          </Button>
        </div>
      </Container>
    </section>
  );
}
