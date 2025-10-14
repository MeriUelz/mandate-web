import React from 'react';
import { Link } from '@tanstack/react-router';
import { Container } from '~/components/ui/Container';
import { Button } from '~/components/ui/Button';
import { ArrowRight, Shield, Lock, FileText, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white" role="contentinfo">
      {/* Final CTA Section */}
      <section className="py-16 bg-neutral-800" aria-labelledby="footer-cta-heading">
        <Container>
          <div className="text-center">
            <h2 id="footer-cta-heading" className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to stop chargebacks before they happen?
            </h2>
            <p className="text-lg mb-8 text-neutral-300 max-w-2xl mx-auto">
              Book a demo today to see how we can help reduce your chargebacks.
            </p>
            <a 
              href="https://calendar.app.google/MuyapKxcpQXibsto7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-lg font-medium rounded-md text-neutral-900 bg-neutral-50 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 transition-colors"
            >
              Book a demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </Container>
      </section>

      {/* Footer Links */}
      <div className="py-16 border-t border-neutral-800">
        <Container>
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-xl font-bold">Mandate</span>
              </div>
              <p className="text-neutral-400 leading-relaxed max-w-md text-base">
                Pre-dispute autopilot for subscriptions. Stop chargebacks before they happen 
                with intelligent orchestration of Verifi and Ethoca networks.
              </p>
            </div>

            {/* Product Links */}
            <nav aria-labelledby="footer-product-heading">
              <h4 id="footer-product-heading" className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-4 text-neutral-400">
                <li><Link to="/how-it-works-ecosystem" className="hover:text-white transition-colors">How it works</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ROI Calculator</a></li>
              </ul>
            </nav>

            {/* Company Links */}
            <nav aria-labelledby="footer-company-heading">
              <h4 id="footer-company-heading" className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-4 text-neutral-400">
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center">
                  <Shield className="w-4 h-4 mr-3" />
                  Security
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors">Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Postmortems</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><Link to="/privacy-policy" className="hover:text-white transition-colors flex items-center">
                  <Lock className="w-4 h-4 mr-3" />
                  Privacy
                </Link></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center">
                  <FileText className="w-4 h-4 mr-3" />
                  Terms
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center">
                  <Mail className="w-4 h-4 mr-3" />
                  Contact
                </a></li>
              </ul>
            </nav>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-6 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
            <div className="text-neutral-400">
              © {currentYear} Mandate. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 mt-6 md:mt-0">
              <div className="text-neutral-400 text-sm">
                SOC 2 Type II • ISO 27001 • PCI-light
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
