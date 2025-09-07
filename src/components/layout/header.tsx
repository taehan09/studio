"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#home', label: 'HOME' },
  { href: '#about', label: 'ABOUT' },
  { href: '#artists', label: 'ARTISTS' },
  { href: '#gallery', label: 'GALLERY' },
  { href: '#contact', label: 'CONTACT' },
  { href: '#location', label: 'LOCATION' },
  { href: '#faq', label: 'FAQ' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-background/95 shadow-md' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="#home" className="text-xl font-bold text-primary hover:text-gray-300 transition-colors">
            ashgray_ink
          </Link>
          <nav className="hidden md:flex flex-1 items-center justify-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center space-x-4">
             <Link href="#" className="text-foreground/80 hover:text-white transition-colors" aria-label="Instagram">
              <Instagram />
            </Link>
            <Link href="#" className="text-foreground/80 hover:text-white transition-colors" aria-label="Facebook">
              <Facebook />
            </Link>
          </div>
          <div className="md:hidden">
            <Button onClick={toggleMenu} variant="ghost" size="icon">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 pb-4">
          <nav className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-semibold text-foreground hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
             <div className="flex items-center space-x-4 pt-4">
                <Link href="#" className="text-foreground/80 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram />
                </Link>
                <Link href="#" className="text-foreground/80 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook />
                </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
