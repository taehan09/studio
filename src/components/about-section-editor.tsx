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
import { Loader2, Save } from "lucide-react";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const aboutFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  imageUrl: z.string().url("Image URL must be a valid URL.").optional(),
});

type AboutFormValues = z.infer<typeof aboutFormSchema>;

type AboutSectionEditorProps = {
    initialData: AboutText;
}

export default function AboutSectionEditor({ initialData }: AboutSectionEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData.imageUrl);
  const { toast } = useToast();

  const form = useForm<AboutFormValues>({
    resolver: zodResolver(aboutFormSchema),
    defaultValues: {
        title: initialData.title || '',
        description: initialData.description || '',
        imageUrl: initialData.imageUrl || '',
    },
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

  const onSubmit = async (data: AboutFormValues) => {
    setIsSaving(true);
    try {
        let finalImageUrl = imagePreview || initialData.imageUrl;
        if (imageFile) {
            finalImageUrl = await uploadAboutImage(imageFile);
        }

      const completeData: AboutText = { ...data, imageUrl: finalImageUrl };
      await updateAboutText(completeData);

      setImagePreview(finalImageUrl);
      form.reset({ ...data, imageUrl: finalImageUrl });
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
        <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left Column: Text inputs */}
            <div className="space-y-6">
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
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea placeholder="About section content..." {...field} rows={10}/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
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
            </div>

            {/* Right Column: Image Uploader */}
            <div className="space-y-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>About Section Image</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FormItem>
                            {imagePreview && (
                                <div className="mt-2 relative w-full h-64 border rounded-lg overflow-hidden">
                                    <Image src={imagePreview} alt="About section preview" fill objectFit="cover" />
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
                    </CardContent>
                 </Card>
            </div>
        </div>
      </form>
    </Form>
  );
}
