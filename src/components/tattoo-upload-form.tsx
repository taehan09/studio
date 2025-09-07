"use client";

import { useState, type FormEvent, useActionState } from "react";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { categorizeTattooDesignAction } from "@/app/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UploadCloud, Loader2, Tag } from "lucide-react";
import { Badge } from "./ui/badge";

const initialState = {
  styleCategory: "",
  error: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary hover:bg-primary/90">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Categorizing...
        </>
      ) : (
        <>
          <UploadCloud className="mr-2 h-4 w-4" />
          Categorize Design
        </>
      )}
    </Button>
  );
}

export default function TattooUploadForm() {
  const [state, formAction] = useActionState(categorizeTattooDesignAction, initialState);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!preview) {
        // This case should ideally be handled by form validation
        return;
    }
    const formData = new FormData(event.currentTarget);
    formData.set('photoDataUri', preview);
    formAction(formData);
  };


  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="tattoo-image">Tattoo Image</Label>
        <Input
          id="tattoo-image"
          name="tattoo-image"
          type="file"
          accept="image/*"
          required
          onChange={handleFileChange}
          className="file:text-primary file:font-semibold"
        />
      </div>

      {preview && (
        <div className="relative w-full max-w-sm mx-auto h-64 border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden">
          <Image src={preview} alt="Tattoo preview" layout="fill" objectFit="contain" />
          <input type="hidden" name="photoDataUri" value={preview} />
        </div>
      )}

      <SubmitButton />

      {state?.error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state?.styleCategory && (
        <Alert variant="default" className="bg-accent/20 border-accent">
           <Tag className="h-4 w-4 text-accent" />
          <AlertTitle className="text-accent font-headline">AI Categorization Result</AlertTitle>
          <AlertDescription className="flex items-center gap-2">
            This design is categorized as: <Badge variant="secondary" className="text-base">{state.styleCategory}</Badge>
          </AlertDescription>
        </Alert>
      )}
    </form>
  );
}
