// src/components/sections/contact-section.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getArtists } from "@/lib/firebase";

const ContactSection = () => {
  const [artists, setArtists] = useState<{ id: string, name: string }[]>([]);

  useEffect(() => {
    const unsubscribe = getArtists((data) => {
      if (data) {
        setArtists(data.map(d => ({id: d.id, name: d.name})));
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <section id="contact" className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-none">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-4xl text-primary">APPOINTMENT REQUEST</CardTitle>
              <CardDescription className="text-lg max-w-2xl mx-auto">
                Ready to take the next step? Fill out the form below to begin your consultation process with one of our world-class artists.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input id="fullName" name="fullName" placeholder="Your full name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" name="phone" placeholder="(555) 123-4567" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="preferredArtist">Preferred Artist</Label>
                    <Select name="preferredArtist">
                      <SelectTrigger><SelectValue placeholder="Select artist" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="No preference">No preference</SelectItem>
                        {artists.map(artist => (
                          <SelectItem key={artist.id} value={artist.name}>{artist.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tattooStyle">Tattoo Style</Label>
                    <Select name="tattooStyle">
                      <SelectTrigger><SelectValue placeholder="Select style" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Traditional">Traditional</SelectItem>
                        <SelectItem value="Realism">Realism</SelectItem>
                        <SelectItem value="Watercolor">Watercolor</SelectItem>
                        <SelectItem value="Blackwork">Blackwork</SelectItem>
                        <SelectItem value="Neo-Traditional">Neo-Traditional</SelectItem>
                        <SelectItem value="Japanese">Japanese</SelectItem>
                        <SelectItem value="Geometric">Geometric</SelectItem>
                        <SelectItem value="Fine-line">Fine-line</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tattooDescription">Tattoo Description *</Label>
                  <Textarea id="tattooDescription" name="tattooDescription" placeholder="Describe your tattoo idea in detail..." rows={6} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="budgetRange">Budget Range</Label>
                     <Select name="budgetRange">
                      <SelectTrigger><SelectValue placeholder="Select budget" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Under $200">Under $200</SelectItem>
                        <SelectItem value="$200 - $500">$200 - $500</SelectItem>
                        <SelectItem value="$500 - $1000">$500 - $1,000</SelectItem>
                        <SelectItem value="$1000 - $2000">$1,000 - $2,000</SelectItem>
                        <SelectItem value="$2000+">$2,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferredTimeframe">Preferred Timeframe</Label>
                    <Select name="preferredTimeframe">
                        <SelectTrigger><SelectValue placeholder="Select timeframe" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ASAP">As soon as possible</SelectItem>
                            <SelectItem value="Next Month">Next Month</SelectItem>
                            <SelectItem value="1-3 Months">1-3 Months</SelectItem>
                            <SelectItem value="Flexible">Flexible</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="pt-4">
                  <Button type="button" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    SUBMIT APPOINTMENT REQUEST
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
