import Link from 'next/link';
import { Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <div className="bg-slate-50 border-t border-slate-200/80">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-items-center text-center md:text-left">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">International Federation for Information Processing</h3>
            <p className="text-sm text-slate-600 max-w-xs mx-auto md:mx-0">
              Technical Committee 3<br />
              ICT and Education.
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
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="https://twitter.com/ifip_tc3" className="text-slate-600 hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" version="1.1" width="20" height="20" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/ifip--international-federation-for-information-processing/" className="text-slate-600 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <address className="text-sm text-slate-600 not-italic">
              <a href="https://www.ifip-tc3.net/contact" className="hover:text-primary transition-colors block mb-2">
                www.ifip-tc3.net/contact
              </a>
              <a href="mailto:ifip-tc3@ifip.org" className="hover:text-primary transition-colors">
                ifip-tc3@ifip.org
              </a>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-200/80">
          <p className="text-sm text-slate-600 text-center">
            © {new Date().getFullYear()} IFIP TC3. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
