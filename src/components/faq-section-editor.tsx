// src/components/faq-section-editor.tsx
"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateFaqs, type FaqItem } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Trash2, PlusCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const faqSchema = z.object({
  id: z.string(),
  question: z.string().min(5, "Question must be at least 5 characters."),
  answer: z.string().min(10, "Answer must be at least 10 characters."),
});

const faqsFormSchema = z.object({
  faqs: z.array(faqSchema),
});

type FaqsFormValues = z.infer<typeof faqsFormSchema>;

type FaqSectionEditorProps = {
    initialData: FaqItem[];
}

export default function FaqSectionEditor({ initialData }: FaqSectionEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const form = useForm<FaqsFormValues>({
    resolver: zodResolver(faqsFormSchema),
    defaultValues: {
      faqs: initialData || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "faqs",
  });

  const onSubmit = async (data: FaqsFormValues) => {
    setIsSaving(true);
    try {
      await updateFaqs(data.faqs);
      toast({
        title: "Success!",
        description: "FAQ section has been updated.",
      });
      form.reset(data);
    } catch (error: any) {
      console.error("Failed to update FAQ section:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const addNewFaq = () => {
    append({
        id: `faq_${Date.now()}`,
        question: "New Question",
        answer: "New answer content goes here.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {fields.map((field, index) => (
            <Card key={field.id}>
                <AccordionItem value={`item-${index}`} className="border-b-0">
                <CardHeader>
                    <div className="flex justify-between items-center">
                         <AccordionTrigger className="flex-1 text-left hover:no-underline">
                             <CardTitle className="text-lg">
                                {form.watch(`faqs.${index}.question`) || `FAQ ${index + 1}`}
                             </CardTitle>
                         </AccordionTrigger>
                         <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                            className="text-destructive hover:bg-destructive/10"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <AccordionContent>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name={`faqs.${index}.question`}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Question</FormLabel>
                                <FormControl><Input {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`faqs.${index}.answer`}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Answer</FormLabel>
                                <FormControl><Textarea {...field} rows={5} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </AccordionContent>
                </AccordionItem>
            </Card>
          ))}
        </Accordion>

        <Button type="button" variant="outline" onClick={addNewFaq} className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New FAQ
        </Button>
        
        <hr className="my-6 border-border"/>

        <Button type="submit" disabled={isSaving || !form.formState.isDirty} className="w-full">
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving All FAQs...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save All Changes
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
