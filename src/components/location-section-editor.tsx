// src/components/location-section-editor.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateLocationInfo, type LocationInfo } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

const locationFormSchema = z.object({
  title: z.string().min(3, "Title is required."),
  subtitle: z.string().min(10, "Subtitle is required."),
  address: z.string().min(10, "Address is required."),
  hoursMonSat: z.string().min(1, "Hours are required."),
  hoursSun: z.string().min(1, "Hours are required."),
  hoursConsultations: z.string().min(1, "Hours are required."),
  phone: z.string().min(1, "Phone is required."),
  email: z.string().email("Invalid email."),
  inquiriesEmail: z.string().email("Invalid email."),
  artistsEmail: z.string().email("Invalid email."),
  careersEmail: z.string().email("Invalid email."),
  subwayInfo: z.string().min(1, "Subway info is required."),
  parkingInfo: z.string().min(1, "Parking info is required."),
  walkingInfo: z.string().min(1, "Walking info is required."),
  imageUrl: z.string().url("Must be a valid URL."),
  imageHint: z.string().optional(),
});

type LocationFormValues = z.infer<typeof locationFormSchema>;

type LocationSectionEditorProps = {
    initialData: LocationInfo;
}

export default function LocationSectionEditor({ initialData }: LocationSectionEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const form = useForm<LocationFormValues>({
    resolver: zodResolver(locationFormSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: LocationFormValues) => {
    setIsSaving(true);
    try {
      await updateLocationInfo(data);
      toast({
        title: "Success!",
        description: "Location section has been updated.",
      });
      form.reset(data);
    } catch (error: any) {
      console.error("Failed to update location section:", error);
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div className="space-y-6">
                <Card>
                    <CardHeader><CardTitle>Main Info</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="subtitle" render={({ field }) => (
                            <FormItem><FormLabel>Subtitle</FormLabel><FormControl><Textarea {...field} rows={2} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <FormField control={form.control} name="address" render={({ field }) => (
                            <FormItem><FormLabel>Address</FormLabel><FormControl><Textarea {...field} rows={3} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle>Image</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <FormField control={form.control} name="imageUrl" render={({ field }) => (
                            <FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="imageHint" render={({ field }) => (
                            <FormItem><FormLabel>Image AI Hint</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </CardContent>
                </Card>
            </div>
            {/* Column 2 */}
            <div className="space-y-6">
                <Card>
                    <CardHeader><CardTitle>Hours</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <FormField control={form.control} name="hoursMonSat" render={({ field }) => (
                            <FormItem><FormLabel>Monday - Saturday</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="hoursSun" render={({ field }) => (
                            <FormItem><FormLabel>Sunday</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="hoursConsultations" render={({ field }) => (
                            <FormItem><FormLabel>Consultations</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Getting Here</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <FormField control={form.control} name="subwayInfo" render={({ field }) => (
                            <FormItem><FormLabel>Subway</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="parkingInfo" render={({ field }) => (
                            <FormItem><FormLabel>Parking</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="walkingInfo" render={({ field }) => (
                            <FormItem><FormLabel>Walking</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </CardContent>
                </Card>
            </div>

            {/* Column 3 */}
            <div className="space-y-6">
                 <Card>
                    <CardHeader><CardTitle>Contact Info</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <FormField control={form.control} name="phone" render={({ field }) => (
                            <FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel>Main Email</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="inquiriesEmail" render={({ field }) => (
                            <FormItem><FormLabel>Inquiries Email</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="artistsEmail" render={({ field }) => (
                            <FormItem><FormLabel>Artists Email</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="careersEmail" render={({ field }) => (
                            <FormItem><FormLabel>Careers Email</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormMessage /></FormItem>
                        )} />
                    </CardContent>
                </Card>
            </div>
        </div>

        <Button type="submit" disabled={isSaving || !form.formState.isDirty} className="w-full">
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving Location Info...
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
