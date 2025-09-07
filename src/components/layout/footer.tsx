// src/components/layout/footer.tsx
"use client";

import { Instagram, Facebook, Twitter, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { getFooterInfo, type FooterInfo } from '@/lib/firebase';
import { Skeleton } from '../ui/skeleton';

const defaultFooterInfo: FooterInfo = {
  copyrightName: 'Ashgray Ink',
  privacyPolicyText: 'Privacy Policy',
  termsOfServiceText: 'Terms of Service',
  accessibilityStatementText: 'Accessibility Statement',
  legalDisclaimer: 'Professional tattoo services provided by licensed artists in a sterile and safe environment. Must be 18 or older with valid photo ID. Consultations are by appointment. Walk-ins are welcome, subject to availability. A 25% deposit is required for all bookings.'
}

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [footerInfo, setFooterInfo] = useState<FooterInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    const unsubscribe = getFooterInfo((info) => {
      setFooterInfo(info ?? defaultFooterInfo);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  const currentInfo = footerInfo ?? defaultFooterInfo;

  return (
    <footer className="bg-background text-sm text-foreground/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Separator className="bg-border/50" />
        <div className="flex flex-col sm:flex-row items-center justify-between py-6">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
             {loading ? <Skeleton className="h-5 w-48" /> : <p>&copy; {currentYear} {currentInfo.copyrightName}. All rights reserved.</p>}
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 sm:mb-0">
            {loading ? (
                <>
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-5 w-36" />
                </>
            ) : (
                <>
                    <Link href="#" className="hover:text-accent transition-colors">{currentInfo.privacyPolicyText}</Link>
                    <Link href="#" className="hover:text-accent transition-colors">{currentInfo.termsOfServiceText}</Link>
                    <Link href="#" className="hover:text-accent transition-colors">{currentInfo.accessibilityStatementText}</Link>
                </>
            )}
          </nav>
          <div className="text-center sm:text-right">
             <Link href="#top" onClick={scrollToTop} className="flex items-center gap-2 hover:text-accent transition-colors">
                Back to Top <ArrowUp className="w-4 h-4" />
             </Link>
          </div>
        </div>
        <Separator className="bg-border/50" />
        <div className="text-center py-6">
            {loading ? (
                <div className='space-y-2 max-w-4xl mx-auto'>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-11/12" />
                    <Skeleton className="h-4 w-10/12" />
                </div>
            ) : (
                <p className="max-w-4xl mx-auto text-xs">
                    {currentInfo.legalDisclaimer}
                </p>
            )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
