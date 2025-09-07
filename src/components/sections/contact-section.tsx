"use client";

import { useFormState, useFormStatus } from "react-dom";
import { contactAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const initialState = {
  message: "",
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        "Send Message"
      )}
    </Button>
  );
}

const ContactSection = () => {
  const [state, formAction] = useFormState(contactAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message.startsWith("Success!")) {
      toast({
        title: "Message Sent",
        description: state.message,
      });
    } else if (state.message.startsWith("Failed")) {
        toast({
            title: "Error",
            description: state.message,
            variant: "destructive",
        })
    }
  }, [state, toast]);

  return (
    <section id="contact" className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-4xl text-primary">Get in Touch</CardTitle>
              <CardDescription className="text-lg">
                Have a question or ready to book your session? Drop us a line.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="John Doe" required />
                  {state.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                  {state.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Your Message or Idea</Label>
                  <Textarea id="message" name="message" placeholder="Describe your tattoo idea, ask a question, or request an appointment..." rows={6} required />
                  {state.errors?.message && <p className="text-sm font-medium text-destructive">{state.errors.message}</p>}
                </div>
                <SubmitButton />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
