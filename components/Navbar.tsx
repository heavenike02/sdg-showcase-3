'use client'    
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-semibold text-white">
            IFIP
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-white/80 transition-colors">
              Home
            </Link>
            <Link href="/search" className="text-white hover:text-white/80 transition-colors">
              Search Profiles
            </Link>
            <Button asChild variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-foreground">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>

          <button onClick={toggleMenu} className="md:hidden text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden absolute top-16 inset-x-0 bg-black/80 backdrop-blur-lg">
            <div className="px-4 py-4 space-y-4">
              <Link
                href="/"
                className="block text-white hover:text-white/80 transition-colors"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="/search"
                className="block text-white hover:text-white/80 transition-colors"
                onClick={toggleMenu}
              >
                Search Profiles
              </Link>
              <Button asChild variant="outline" className="w-full bg-transparent text-white border-white hover:bg-white hover:text-foreground">
                <Link href="/contact" onClick={toggleMenu}>
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
