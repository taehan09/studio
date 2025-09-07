// src/components/sections/faq-section.tsx

const faqs = [
  {
    question: "HOW DO I BOOK AN APPOINTMENT?",
    answer: "Once you've selected your preferred artist, you can either stop by the shop, call us, or send a detailed email with a description of the design, some photo references, and your preferred dates to schedule. This will enable us to process your request quickly and efficiently. We schedule appointments a maximum of three months in advance. Our talented Associates are always available to answer your questions via phone - and they actually like talking to people!",
  },
  {
    question: "DOES IT HURT?",
    answer: "Yes! But in the best possible way. Your brain releases endorphins when you go through pain and your body loves endorphins, so yes, it hurts, but you'll kinda like it.",
  },
  {
    question: "HOW OLD DO I HAVE TO BE TO GET A TATTOO?",
    answer: "You must be at least 18 years of age. It is against Ontario law to tattoo a minor, even with parental consent. In accordance with this law we have a strict No Minors policy. Not only must you be 18, every client must prove it with a valid government-issued photo ID. No exceptions.",
  },
  {
    question: "HOW LONG DOES A TATTOO TAKE TO HEAL?",
    answer: 'It takes two-three weeks to "heal," but it takes months for the skin to fully regenerate.',
  },
  {
    question: "HOW MUCH DOES A TATTOO COST?",
    answer: "It depends on the artist, but all tattoos start at $150. Final price is dependent on size, detail of the design, location on the body where it will be placed, and finally, which artist you've chosen. Some artists have a minimum hourly billing, which varies.",
  },
  {
    question: "HOW DO I CARE FOR MY NEW TATTOO?",
    answer: "Every shop has their own recommended care methods. You will be given an instruction card after you've been tattooed.",
  },
];

const FaqSection = () => {
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
            {faqs.map((faq, index) => (
            <div key={index}>
                <h3 className="font-headline text-xl font-bold text-primary mb-4">{faq.question}</h3>
                <p className="text-foreground/80 leading-relaxed">{faq.answer}</p>
            </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
