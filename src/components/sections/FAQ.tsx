import React, { useState } from 'react';
import { Container } from '~/components/ui/Container';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Does this work if I already use smart retries?",
      answer: "Yes. We coordinate dunning/Updater with pre-dispute so you don't re-charge after RDR or confuse cardholders."
    },
    {
      question: "Do I need to switch PSPs?",
      answer: "No. We work on top of your current PSP(s). Our integration layer connects with Stripe, Chargebee, Recurly, Shopify, and others without requiring any changes to your existing setup."
    },
    {
      question: "Do you store card data?",
      answer: "No—PCI-light. We only use PSP IDs and order context. We never handle or store PAN, CVV, or any sensitive card data, which significantly reduces your compliance burden."
    },
    {
      question: "What about agent/AP2 orders?",
      answer: "We ingest mandate/agent_id/intent and add it to receipts and CE packs. This is crucial for agent-assisted purchases where clear consent documentation can make the difference in dispute resolution."
    },
    {
      question: "How quickly can I see results?",
      answer: "Most customers see initial chargeback reduction within the first month. Full optimization typically occurs within 60-90 days as our machine learning models adapt to your specific business patterns."
    },
    {
      question: "What's the implementation timeline?",
      answer: "Integration typically takes 1-2 weeks depending on your PSP setup. We provide dedicated technical support and can often complete the integration in a few days for standard configurations."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-neutral-50" aria-labelledby="faq-heading">
      <Container>
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-neutral-100 rounded-full mb-6">
            <HelpCircle className="w-6 h-6 text-neutral-700" aria-hidden="true" />
          </div>
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-neutral-800">
            Common questions about our pre-dispute platform
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full bg-white rounded-xl p-6 text-left shadow-sm hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neutral-500 border border-neutral-200 hover:border-neutral-300"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base md:text-lg font-semibold text-neutral-900 pr-6">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-neutral-700 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-neutral-700 flex-shrink-0" />
                  )}
                </div>
                
                {openIndex === index && (
                  <div className="mt-4 pt-4 border-t border-neutral-200">
                    <p className="text-neutral-800 leading-relaxed text-base">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
