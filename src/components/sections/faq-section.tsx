// src/components/sections/faq-section.tsx
"use client";

import { useState, useEffect } from 'react';
import { getFaqs, type FaqItem } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

const FaqSection = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getFaqs((data) => {
      setFaqs(data ?? []);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <section id="faq" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-5xl md:text-6xl font-bold text-primary tracking-wider">FAQ</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            Frequently Asked Questions
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-7 w-3/4" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-11/12" />
                  <Skeleton className="h-5 w-10/12" />
                </div>
              ))
            ) : (
              faqs.map((faq) => (
                <div key={faq.id}>
                    <h3 className="font-headline text-xl font-bold text-primary mb-4">{faq.question}</h3>
                    <p className="text-foreground/80 leading-relaxed">{faq.answer}</p>
                </div>
              ))
            )}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
