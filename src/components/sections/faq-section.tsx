import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  {
    question: "How do I book an appointment?",
    answer: "You can book an appointment by filling out the contact form on our website with your design idea, preferred artist, and availability. We will get back to you to schedule a consultation.",
  },
  {
    question: "How is the price of a tattoo determined?",
    answer: "Tattoo pricing depends on several factors, including size, complexity, placement on the body, and the artist's hourly rate. We provide a price estimate during the consultation.",
  },
  {
    question: "What is your deposit policy?",
    answer: "A non-refundable deposit is required to secure your appointment. The deposit amount goes toward the final cost of your tattoo. We require at least 48 hours notice for any rescheduling.",
  },
  {
    question: "How should I prepare for my tattoo session?",
    answer: "Make sure you are well-rested, hydrated, and have eaten a good meal before your appointment. Avoid alcohol and blood-thinning medication for 24 hours prior. Wear comfortable clothing that allows easy access to the tattoo area.",
  },
  {
    question: "What is the aftercare process?",
    answer: "Your artist will provide you with detailed aftercare instructions. Generally, this involves keeping the tattoo clean, applying a thin layer of recommended ointment, and protecting it from sun and soaking in water.",
  },
];

const FaqSection = () => {
  return (
    <section id="faq" className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Frequently Asked Questions</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            Answers to common questions about the tattoo process.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
            <Card className="shadow-xl">
                <CardContent className="p-6 md:p-8">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="text-left font-semibold text-lg hover:text-accent">
                            {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-base text-foreground/80">
                            {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
