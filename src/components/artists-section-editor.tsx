
// src/components/artists-section-editor.tsx
"use client";

import { useState } from "react";
import { useForm, useFieldArray, type Control, type UseFormSetValue } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateArtists, uploadArtistImage, type Artist } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Trash2, PlusCircle, Upload } from "lucide-react";
import Image from 'next/image';
import { Card, CardContent } from "./ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const artistSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters."),
  specialty: z.string().min(3, "Specialty must be at least 3 characters."),
  bio: z.string().min(10, "Bio must be at least 10 characters."),
  imageUrl: z.string().url("Image URL must be a valid URL."),
  imageHint: z.string().optional(),
});

const artistsFormSchema = z.object({
  artists: z.array(artistSchema),
});

type ArtistsFormValues = z.infer<typeof artistsFormSchema>;

type ArtistsSectionEditorProps = {
    initialData: Artist[];
}

const ArtistImageUploader = ({ 
    control, 
    index, 
    getValues,
    setValue 
}: { 
    control: Control<ArtistsFormValues>, 
    index: number, 
    getValues: any,
    setValue: UseFormSetValue<ArtistsFormValues>
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(getValues(`artists.${index}.imageUrl`));
  const { toast } = useToast();
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);

      try {
        const artistId = getValues(`artists.${index}.id`);
        const downloadURL = await uploadArtistImage(file, artistId);
        setValue(`artists.${index}.imageUrl`, downloadURL, { shouldDirty: true, shouldValidate: true });
        setImagePreview(downloadURL);
        toast({ title: "Image uploaded!" });
      } catch (error: any) {
        toast({ title: "Upload failed", description: error.message, variant: "destructive" });
        // Revert preview if upload fails
        setImagePreview(getValues(`artists.${index}.imageUrl`));
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <FormItem>
      <FormLabel>Artist Image</FormLabel>
      {imagePreview && (
        <div className="mt-2 relative w-full h-48 border rounded-lg overflow-hidden">
          <Image src={imagePreview} alt="Artist preview" fill objectFit="cover" />
        </div>
      )}
      <FormControl>
        <div className="relative">
          <Input
            type="file"
            accept="image/*"
            className="mt-2 pr-12 file:text-primary file:font-semibold"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          {isUploading && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin" />}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default function ArtistsSectionEditor({ initialData }: ArtistsSectionEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const form = useForm<ArtistsFormValues>({
    resolver: zodResolver(artistsFormSchema),
    defaultValues: {
      artists: initialData || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "artists",
  });

  const onSubmit = async (data: ArtistsFormValues) => {
    setIsSaving(true);
    try {
      await updateArtists(data.artists);
      toast({
        title: "Success!",
        description: "Artists section has been updated.",
      });
      form.reset(data); // Reset form with the new values to clear dirty state
    } catch (error: any) {
      console.error("Failed to update artists section:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const addNewArtist = () => {
    append({
        id: `artist_${Date.now()}`,
        name: "New Artist",
        specialty: "Specialty",
        bio: "Artist bio",
        imageUrl: "https://picsum.photos/400/500",
        imageHint: "new artist"
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        <Accordion type="multiple" className="w-full space-y-4">
            {fields.map((field, index) => (
                <Card key={field.id} className="border-border">
                    <AccordionItem value={field.id} className="border-b-0">
                        <div className="flex items-center w-full p-4">
                            <AccordionTrigger className="flex-1 text-lg font-semibold text-left hover:no-underline p-0">
                                {form.watch(`artists.${index}.name`)}
                            </AccordionTrigger>
                            <Button size="icon" variant="ghost" className="hover:bg-destructive/20 ml-4" onClick={() => remove(index)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                        <AccordionContent className="p-4 pt-0">
                             <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name={`artists.${index}.name`}
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`artists.${index}.specialty`}
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Specialty</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`artists.${index}.bio`}
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl><Textarea {...field} rows={3} /></FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                  control={form.control}
                                  name={`artists.${index}.imageUrl`}
                                  render={() => <ArtistImageUploader control={form.control} index={index} getValues={form.getValues} setValue={form.setValue}/>}
                                />
                                <FormField
                                  control={form.control}
                                  name={`artists.${index}.imageHint`}
                                  render={({ field }) => (
                                      <FormItem>
                                      <FormLabel>Image AI Hint</FormLabel>
                                      <FormControl><Input {...field} placeholder="e.g. tattoo artist" /></FormControl>
                                      <FormMessage />
                                      </FormItem>
                                  )}
                                />
                             </div>
                        </AccordionContent>
                    </AccordionItem>
                </Card>
            ))}
        </Accordion>

        <Button type="button" variant="outline" onClick={addNewArtist}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Artist
        </Button>
        
        <hr className="my-6 border-border"/>

        <Button type="submit" disabled={isSaving || !form.formState.isDirty} className="w-full">
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving Artists...
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
