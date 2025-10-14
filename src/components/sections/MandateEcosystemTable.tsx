import React from 'react';
import { Container } from '~/components/ui/Container';
import { cn } from '~/lib/utils';
import { Check, Triangle, Minus, Shield, Zap, CreditCard, AlertTriangle, Bot, Building2 } from 'lucide-react';

const ecosystemData = [
  {
    actor: "Mandate",
    examples: [],
    billingDunning: "—",
    paymentsProcessing: "—", 
    preDisputeOrchestration: "✓",
    disputeOpsEvidence: "✓",
    fraudPrevention: "△ (works with existing stack)",
    pciImpact: "PCI-light (token-in/out; no PAN)",
    howItFits: "Orchestrates pre-dispute rails, automates evidence & decisions across PSPs",
    isMandate: true
  },
  {
    actor: "Billing platforms",
    examples: ["Chargebee", "Zuora", "Recurly"],
    billingDunning: "✓",
    paymentsProcessing: "—",
    preDisputeOrchestration: "△ (through PSPs/partners)",
    disputeOpsEvidence: "△ (internal workflows; not issuer-facing)",
    fraudPrevention: "△ (via partners)",
    pciImpact: "Neutral (depends on PSP)",
    howItFits: "Mandate plugs in beside billing to reduce disputes from renewals/trials",
    isMandate: false
  },
  {
    actor: "PSPs / Acquirers",
    examples: ["Stripe", "Adyen", "Checkout.com", "Worldpay"],
    billingDunning: "—",
    paymentsProcessing: "✓",
    preDisputeOrchestration: "△/✓ (varies by provider)",
    disputeOpsEvidence: "△ (tools for representment vary)",
    fraudPrevention: "✓ (risk tools)",
    pciImpact: "Managed via PSP",
    howItFits: "Mandate sits above 1+ PSPs and governs pre-dispute & evidence consistently",
    isMandate: false
  },
  {
    actor: "Network tools",
    examples: ["Verifi OI/RDR", "Ethoca"],
    billingDunning: "—",
    paymentsProcessing: "—",
    preDisputeOrchestration: "✓",
    disputeOpsEvidence: "—",
    fraudPrevention: "—",
    pciImpact: "Neutral",
    howItFits: "Mandate orchestrates these rails with rules & context from your systems",
    isMandate: false
  },
  {
    actor: "Dispute mgmt vendors",
    examples: ["Justt", "Chargebacks911", "Chargeflow"],
    billingDunning: "—",
    paymentsProcessing: "—",
    preDisputeOrchestration: "△",
    disputeOpsEvidence: "✓",
    fraudPrevention: "—",
    pciImpact: "Neutral",
    howItFits: "Mandate can complement or replace parts; keeps control/visibility with you",
    isMandate: false
  },
  {
    actor: "Fraud platforms",
    examples: ["Forter", "Riskified", "Sift", "Signifyd"],
    billingDunning: "—",
    paymentsProcessing: "—",
    preDisputeOrchestration: "—",
    disputeOpsEvidence: "△ (limited)",
    fraudPrevention: "✓",
    pciImpact: "Neutral",
    howItFits: "Mandate uses their risk signals; focuses on pre-dispute & evidence",
    isMandate: false
  },
  {
    actor: "Bot/enumeration mitigation",
    examples: ["Cloudflare Bot Mgmt", "Kasada", "Arkose"],
    billingDunning: "—",
    paymentsProcessing: "—",
    preDisputeOrchestration: "—",
    disputeOpsEvidence: "—",
    fraudPrevention: "✓ (anti-testing)",
    pciImpact: "Neutral",
    howItFits: "Mandate pairs with them to stop card-testing → fewer \"mystery\" renewals",
    isMandate: false
  }
];

const CapabilityIndicator = ({ value }: { value: string }) => {
  if (value === "✓") {
    return <Check className="w-5 h-5 text-green-600" />;
  }
  if (value.startsWith("△")) {
    return (
      <div className="flex items-center space-x-1">
        <Triangle className="w-4 h-4 text-yellow-600" />
        {value.length > 1 && (
          <span className="text-xs text-neutral-600 hidden lg:inline">
            {value.substring(2)}
          </span>
        )}
      </div>
    );
  }
  if (value === "—") {
    return <Minus className="w-5 h-5 text-neutral-400" />;
  }
  return <span className="text-sm text-neutral-700">{value}</span>;
};

export function MandateEcosystemTable() {
  return (
    <section className="py-16 bg-white">
      <Container size="xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            How Mandate Fits in the Ecosystem
          </h1>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
            Understanding Mandate's position among billing platforms, PSPs, fraud tools, 
            and dispute management vendors in the payments ecosystem.
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border-collapse border border-neutral-200 rounded-lg">
            <thead>
              <tr className="bg-neutral-50">
                <th className="border border-neutral-200 p-4 text-left font-semibold text-neutral-900">
                  Actor (examples)
                </th>
                <th className="border border-neutral-200 p-4 text-center font-semibold text-neutral-900">
                  <div className="flex flex-col items-center space-y-1">
                    <CreditCard className="w-5 h-5" />
                    <span>Billing & dunning</span>
                  </div>
                </th>
                <th className="border border-neutral-200 p-4 text-center font-semibold text-neutral-900">
                  <div className="flex flex-col items-center space-y-1">
                    <Building2 className="w-5 h-5" />
                    <span>Payments processing</span>
                  </div>
                </th>
                <th className="border border-neutral-200 p-4 text-center font-semibold text-neutral-900">
                  <div className="flex flex-col items-center space-y-1">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Pre-dispute orchestration</span>
                  </div>
                </th>
                <th className="border border-neutral-200 p-4 text-center font-semibold text-neutral-900">
                  <div className="flex flex-col items-center space-y-1">
                    <Shield className="w-5 h-5" />
                    <span>Dispute ops & evidence</span>
                  </div>
                </th>
                <th className="border border-neutral-200 p-4 text-center font-semibold text-neutral-900">
                  <div className="flex flex-col items-center space-y-1">
                    <Bot className="w-5 h-5" />
                    <span>Fraud prevention</span>
                  </div>
                </th>
                <th className="border border-neutral-200 p-4 text-center font-semibold text-neutral-900">
                  PCI impact
                </th>
                <th className="border border-neutral-200 p-4 text-left font-semibold text-neutral-900">
                  How it fits with Mandate
                </th>
              </tr>
            </thead>
            <tbody>
              {ecosystemData.map((row, index) => (
                <tr key={index} className={cn(
                  row.isMandate ? "bg-blue-50 border-blue-200" : "hover:bg-neutral-50"
                )}>
                  <td className={cn(
                    "border p-4",
                    row.isMandate ? "border-blue-200" : "border-neutral-200"
                  )}>
                    <div>
                      <div className={cn(
                        "font-semibold mb-1",
                        row.isMandate ? "text-blue-900" : "text-neutral-900"
                      )}>
                        {row.actor}
                      </div>
                      {row.examples.length > 0 && (
                        <div className="text-sm text-neutral-600">
                          {row.examples.join(", ")}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className={cn(
                    "border p-4 text-center",
                    row.isMandate ? "border-blue-200" : "border-neutral-200"
                  )}>
                    <CapabilityIndicator value={row.billingDunning} />
                  </td>
                  <td className={cn(
                    "border p-4 text-center",
                    row.isMandate ? "border-blue-200" : "border-neutral-200"
                  )}>
                    <CapabilityIndicator value={row.paymentsProcessing} />
                  </td>
                  <td className={cn(
                    "border p-4 text-center",
                    row.isMandate ? "border-blue-200" : "border-neutral-200"
                  )}>
                    <CapabilityIndicator value={row.preDisputeOrchestration} />
                  </td>
                  <td className={cn(
                    "border p-4 text-center",
                    row.isMandate ? "border-blue-200" : "border-neutral-200"
                  )}>
                    <CapabilityIndicator value={row.disputeOpsEvidence} />
                  </td>
                  <td className={cn(
                    "border p-4 text-center",
                    row.isMandate ? "border-blue-200" : "border-neutral-200"
                  )}>
                    <CapabilityIndicator value={row.fraudPrevention} />
                  </td>
                  <td className={cn(
                    "border p-4 text-center text-sm",
                    row.isMandate ? "border-blue-200 font-semibold text-blue-900" : "border-neutral-200 text-neutral-700"
                  )}>
                    {row.pciImpact}
                  </td>
                  <td className={cn(
                    "border p-4 text-sm",
                    row.isMandate ? "border-blue-200 text-blue-900 font-medium" : "border-neutral-200 text-neutral-700"
                  )}>
                    {row.howItFits}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-6">
          {ecosystemData.map((row, index) => (
            <div key={index} className={cn(
              "border rounded-lg p-6",
              row.isMandate 
                ? "border-blue-200 bg-blue-50" 
                : "border-neutral-200 bg-white"
            )}>
              <div className="mb-4">
                <h3 className={cn(
                  "text-lg font-semibold mb-1",
                  row.isMandate ? "text-blue-900" : "text-neutral-900"
                )}>
                  {row.actor}
                </h3>
                {row.examples.length > 0 && (
                  <p className="text-sm text-neutral-600">
                    {row.examples.join(", ")}
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-neutral-700">Billing & dunning</span>
                  <CapabilityIndicator value={row.billingDunning} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-neutral-700">Payments processing</span>
                  <CapabilityIndicator value={row.paymentsProcessing} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-neutral-700">Pre-dispute orchestration</span>
                  <CapabilityIndicator value={row.preDisputeOrchestration} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-neutral-700">Dispute ops & evidence</span>
                  <CapabilityIndicator value={row.disputeOpsEvidence} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-neutral-700">Fraud prevention</span>
                  <CapabilityIndicator value={row.fraudPrevention} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-neutral-700">PCI impact</span>
                  <span className={cn(
                    "text-sm",
                    row.isMandate ? "font-semibold text-blue-900" : "text-neutral-700"
                  )}>
                    {row.pciImpact}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <h4 className="text-sm font-medium text-neutral-700 mb-2">How it fits with Mandate</h4>
                <p className={cn(
                  "text-sm",
                  row.isMandate ? "text-blue-900 font-medium" : "text-neutral-600"
                )}>
                  {row.howItFits}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 p-6 bg-neutral-50 rounded-lg">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Legend</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-neutral-700">Full capability</span>
            </div>
            <div className="flex items-center space-x-2">
              <Triangle className="w-4 h-4 text-yellow-600" />
              <span className="text-neutral-700">Partial/Limited capability</span>
            </div>
            <div className="flex items-center space-x-2">
              <Minus className="w-5 h-5 text-neutral-400" />
              <span className="text-neutral-700">No capability</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
