// src/components/footer-editor.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateFooterInfo, type FooterInfo } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

const footerFormSchema = z.object({
  copyrightName: z.string().min(1, "Copyright Name is required."),
  privacyPolicyText: z.string().min(1, "Privacy Policy text is required."),
  termsOfServiceText: z.string().min(1, "Terms of Service text is required."),
  accessibilityStatementText: z.string().min(1, "Accessibility Statement text is required."),
  legalDisclaimer: z.string().min(10, "Legal disclaimer is required."),
});

type FooterFormValues = z.infer<typeof footerFormSchema>;

type FooterEditorProps = {
    initialData: FooterInfo;
}

export default function FooterEditor({ initialData }: FooterEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const form = useForm<FooterFormValues>({
    resolver: zodResolver(footerFormSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: FooterFormValues) => {
    setIsSaving(true);
    try {
      await updateFooterInfo(data);
      toast({
        title: "Success!",
        description: "Footer text has been updated.",
      });
      form.reset(data);
    } catch (error: any) {
      console.error("Failed to update footer:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <CardHeader><CardTitle>Copyright & Links</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <FormField control={form.control} name="copyrightName" render={({ field }) => (
                        <FormItem><FormLabel>Copyright Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="privacyPolicyText" render={({ field }) => (
                        <FormItem><FormLabel>Privacy Policy Link Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="termsOfServiceText" render={({ field }) => (
                        <FormItem><FormLabel>Terms of Service Link Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="accessibilityStatementText" render={({ field }) => (
                        <FormItem><FormLabel>Accessibility Statement Link Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle>Legal Disclaimer</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <FormField control={form.control} name="legalDisclaimer" render={({ field }) => (
                        <FormItem><FormLabel>Disclaimer Text</FormLabel><FormControl><Textarea {...field} rows={8} /></FormControl><FormMessage /></FormItem>
                    )} />
                </CardContent>
            </Card>
        </div>

        <Button type="submit" disabled={isSaving || !form.formState.isDirty} className="w-full">
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving Footer Info...
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
