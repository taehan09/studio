// src/components/hero-text-editor.tsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getHeroText, updateHeroText, type HeroText } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const heroFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  subtitle: z.string().min(10, "Subtitle must be at least 10 characters."),
});

export default function HeroTextEditor() {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof heroFormSchema>>({
    resolver: zodResolver(heroFormSchema),
    defaultValues: {
      title: "",
      subtitle: "",
    },
  });

  useEffect(() => {
    async function loadHeroText() {
      try {
        const data = await getHeroText();
        form.reset(data);
      } catch (error) {
        console.error("Failed to load hero text:", error);
        toast({
          title: "Error",
          description: "Could not load hero text. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    loadHeroText();
  }, [form, toast]);

  const onSubmit = async (data: HeroText) => {
    setIsSaving(true);
    try {
      await updateHeroText(data);
      toast({
        title: "Success!",
        description: "Hero section text has been updated.",
      });
    } catch (error) {
      console.error("Failed to update hero text:", error);
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
        <div className="space-y-4">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-32" />
        </div>
    );
  }

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
                <Input placeholder="Hero section title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subtitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtitle</FormLabel>
              <FormControl>
                <Textarea placeholder="Hero section subtitle" {...field} rows={3}/>
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
      </form>
    </Form>
  );
}
