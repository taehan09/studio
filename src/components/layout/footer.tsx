import { Instagram, Facebook, Twitter } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link href="#" className="text-foreground/60 hover:text-accent transition-colors" aria-label="Instagram">
              <Instagram />
            </Link>
            <Link href="#" className="text-foreground/60 hover:text-accent transition-colors" aria-label="Facebook">
              <Facebook />
            </Link>
            <Link href="#" className="text-foreground/60 hover:text-accent transition-colors" aria-label="Twitter">
              <Twitter />
            </Link>
          </div>
          <p className="text-sm text-foreground/60">
            &copy; {currentYear} Ashgray Ink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
