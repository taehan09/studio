
// src/components/about-section-editor.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateAboutText, uploadAboutImage, type AboutText } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Upload } from "lucide-react";
import Image from 'next/image';

const aboutFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  paragraph1: z.string().min(10, "Paragraph 1 must be at least 10 characters."),
  paragraph2: z.string().min(10, "Paragraph 2 must be at least 10 characters."),
  paragraph3: z.string().min(10, "Paragraph 3 must be at least 10 characters."),
  imageUrl: z.string().url("Image URL must be a valid URL."),
});

type AboutSectionEditorProps = {
    initialData: AboutText;
}

export default function AboutSectionEditor({ initialData }: AboutSectionEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData.imageUrl);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof aboutFormSchema>>({
    resolver: zodResolver(aboutFormSchema),
    defaultValues: initialData,
    values: { // Ensures the form is controlled by the component's state
        ...initialData,
        imageUrl: imagePreview || initialData.imageUrl,
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: z.infer<typeof aboutFormSchema>) => {
    setIsSaving(true);
    try {
        let finalImageUrl = data.imageUrl;
        if (imageFile) {
            finalImageUrl = await uploadAboutImage(imageFile);
        }

      const completeData: AboutText = { ...data, imageUrl: finalImageUrl };
      await updateAboutText(completeData);

      // After successful save, update the preview and reset the file state
      setImagePreview(finalImageUrl);
      form.reset(completeData); // reset form with new data
      setImageFile(null);

      toast({
        title: "Success!",
        description: "About section has been updated.",
      });
    } catch (error: any) {
      console.error("Failed to update about section:", error);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Section title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paragraph1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paragraph 1</FormLabel>
              <FormControl>
                <Textarea placeholder="First paragraph of the about section" {...field} rows={5}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paragraph2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paragraph 2</FormLabel>
              <FormControl>
                <Textarea placeholder="Second paragraph of the about section" {...field} rows={5}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paragraph3"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paragraph 3</FormLabel>
              <FormControl>
                <Textarea placeholder="Third paragraph of the about section" {...field} rows={5}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormItem>
          <FormLabel>About Section Image</FormLabel>
            {imagePreview && (
                <div className="mt-2 relative w-full h-64 border rounded-lg overflow-hidden">
                    <Image src={imagePreview} alt="About section preview" layout="fill" objectFit="cover" />
                </div>
            )}
          <FormControl>
             <Input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                className="mt-2 file:text-primary file:font-semibold"
             />
          </FormControl>
          <FormMessage />
        </FormItem>

        <Button type="submit" disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
