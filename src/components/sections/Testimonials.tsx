import React from 'react';
import { Container } from '~/components/ui/Container';
import { Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      quote: "Cut chargebacks on renewals without touching our checkout.",
      author: "Head of Payments",
      company: "SaaS Company"
    },
    {
      quote: "RDR where it made sense; strong evidence everywhere else.",
      author: "VP Finance",
      company: "DTC Subscriptions"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-neutral-100 rounded-full mb-6">
            <Quote className="w-6 h-6 text-neutral-700" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            Testimonials
          </h2>
          <p className="text-lg text-neutral-800">
            What our customers say about their results
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-neutral-50 rounded-2xl p-8 shadow-lg border border-neutral-200 hover:shadow-xl transition-all duration-300">
              <Quote className="w-6 h-6 text-neutral-700 mb-6" />
              
              <blockquote className="text-lg md:text-xl font-medium text-neutral-900 mb-8 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full mr-4 bg-neutral-200 flex items-center justify-center">
                  <div className="w-6 h-6 bg-neutral-400 rounded-full"></div>
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 text-base">
                    {testimonial.author}
                  </div>
                  <div className="text-neutral-700">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-8 text-neutral-700 text-base">
            <div className="font-medium">Trusted by 200+ subscription businesses</div>
            <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full"></div>
            <div className="font-medium">$50M+ in chargebacks prevented</div>
            <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full"></div>
            <div className="font-medium">99.9% uptime SLA</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
