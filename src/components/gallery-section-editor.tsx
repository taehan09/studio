// src/components/gallery-section-editor.tsx
"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateGalleryImages, uploadGalleryImage, deleteGalleryImage, type GalleryImage } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Trash2, PlusCircle, Upload } from "lucide-react";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";

const filterCategories = ['REALISM', 'TRADITIONAL', 'BLACKWORK', 'FINE-LINE', 'COLOR', 'JAPANESE', 'GEOMETRIC'];

const imageSchema = z.object({
  id: z.string(),
  src: z.string().url(),
  alt: z.string().min(1, "Alt text is required."),
  hint: z.string().min(1, "AI hint is required."),
  category: z.string(),
});

const galleryFormSchema = z.object({
  images: z.array(imageSchema),
});

type GalleryFormValues = z.infer<typeof galleryFormSchema>;

export default function GallerySectionEditor({ initialData }: { initialData: GalleryImage[] }) {
  const [isSaving, setIsSaving] = useState(false);
  const [activeCategory, setActiveCategory] = useState(filterCategories[0]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(galleryFormSchema),
    defaultValues: {
      images: initialData || [],
    },
  });

  useEffect(() => {
    form.reset({ images: initialData });
  }, [initialData, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const onSubmit = async (data: GalleryFormValues) => {
    setIsSaving(true);
    try {
      await updateGalleryImages(data.images);
      toast({
        title: "Success!",
        description: "Gallery has been updated.",
      });
      form.reset(data); 
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save changes.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const downloadURL = await uploadGalleryImage(file, activeCategory);
        append({
          id: `img_${Date.now()}`,
          src: downloadURL,
          alt: `Tattoo in ${activeCategory} style`,
          hint: 'tattoo ' + activeCategory.toLowerCase(),
          category: activeCategory,
        });
        toast({ title: "Image uploaded successfully!" });
      } catch (error: any) {
        toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      } finally {
        setIsUploading(false);
      }
    }
  };
  
  const handleRemoveImage = async (index: number) => {
    const imageToRemove = form.getValues(`images.${index}`);
    try {
      // Optimistically remove from UI
      remove(index);
      // Attempt to delete from storage
      await deleteGalleryImage(imageToRemove.src);
      toast({title: "Image removed."});
    } catch (error: any) {
      // If deletion fails, add it back to the form (or handle more gracefully)
      append(imageToRemove, { shouldFocus: false });
      toast({ title: "Error removing image", description: error.message, variant: "destructive" });
    }
  };
  
  const filteredImages = fields.map((field, index) => ({...field, originalIndex: index})).filter(field => field.category.toUpperCase() === activeCategory);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 space-y-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Categories</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {filterCategories.map((category) => (
                        <Button
                            key={category}
                            type="button"
                            variant={activeCategory === category ? "secondary" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </Button>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <div className="md:col-span-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Editing: {activeCategory}</CardTitle>
                        <CardDescription>Manage images for this category.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                           {filteredImages.map((field) => (
                               <Card key={field.id} className="group relative aspect-square">
                                    <Image src={field.src} alt={field.alt} layout="fill" objectFit="cover" className="rounded-md"/>
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                         <Button
                                            type="button"
                                            size="icon"
                                            variant="destructive"
                                            onClick={() => handleRemoveImage(field.originalIndex)}
                                        >
                                            <Trash2 className="h-4 w-4"/>
                                            <span className="sr-only">Delete Image</span>
                                        </Button>
                                    </div>
                               </Card>
                           ))}
                           <Card className="aspect-square border-2 border-dashed flex items-center justify-center">
                                <Label htmlFor="image-upload" className="cursor-pointer text-center p-4">
                                     {isUploading ? (
                                        <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                                     ) : (
                                        <div className="space-y-2 text-muted-foreground">
                                             <Upload className="h-8 w-8 mx-auto"/>
                                            <span>Upload Image</span>
                                        </div>
                                     )}
                                </Label>
                                <Input 
                                    id="image-upload" 
                                    type="file" 
                                    accept="image/*" 
                                    className="sr-only" 
                                    onChange={handleFileChange}
                                    disabled={isUploading}
                                />
                           </Card>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
        
        <hr className="my-6 border-border"/>

        <Button type="submit" disabled={isSaving || !form.formState.isDirty} className="w-full">
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving All Changes...
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
