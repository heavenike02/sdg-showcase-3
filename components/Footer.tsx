import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <div className="bg-slate-50 border-t border-slate-200/80">
      <div className="page-container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">J.E. Cairnes</h3>
            <p className="text-sm text-slate-600 max-w-xs">
              School of Business & Economics, committed to sustainable development and excellence in education.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-primary transition-colors">
                  Search Profiles
                </Link>
              </li>
              <li>
                      <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-600 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-slate-600 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-600 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-slate-600 hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <address className="text-sm text-slate-600 not-italic">
              University Road<br />
              Galway, Ireland<br />
              <a href="tel:+35391524411" className="hover:text-primary transition-colors">
                +353 91 524411
              </a>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-200/80">
          <p className="text-sm text-slate-600 text-center">
            © {new Date().getFullYear()} J.E. Cairnes School of Business & Economics. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
