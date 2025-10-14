import React from 'react';
import { Container } from '~/components/ui/Container';
import { Shield, Lock, FileText, Eye } from 'lucide-react';

export function Security() {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'No PAN/CVV or chargeable tokens',
      description: 'We never handle sensitive card data'
    },
    {
      icon: Shield,
      title: 'Encrypted at rest/in transit',
      description: 'End-to-end encryption for all data'
    },
    {
      icon: FileText,
      title: 'Audit logs',
      description: 'Complete audit trail for compliance'
    },
    {
      icon: Eye,
      title: 'Least-privilege access',
      description: 'Role-based permissions and access controls'
    }
  ];

  return (
    <section className="py-16 bg-neutral-50">
      <Container>
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-neutral-100 rounded-full mb-6">
            <Shield className="w-6 h-6 text-neutral-700" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            Security & compliance
          </h2>
          <p className="text-xl md:text-2xl font-medium text-neutral-700 mb-4">
            PCI-light by design
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-neutral-200 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-neutral-700" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-800 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Compliance badges */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-12 bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-default">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                <span className="text-neutral-800 font-bold text-sm">SOC</span>
              </div>
              <div>
                <div className="font-bold text-neutral-900">SOC 2 Type II</div>
                <div className="text-sm text-neutral-800">Certified</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                <span className="text-neutral-800 font-bold text-sm">ISO</span>
              </div>
              <div>
                <div className="font-bold text-neutral-900">ISO 27001</div>
                <div className="text-sm text-neutral-800">Compliant</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                <span className="text-neutral-800 font-bold text-sm">PCI</span>
              </div>
              <div>
                <div className="font-bold text-neutral-900">PCI-light</div>
                <div className="text-sm text-neutral-800">Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
