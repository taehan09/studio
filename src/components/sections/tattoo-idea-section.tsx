// src/components/sections/tattoo-idea-section.tsx
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { generateTattooIdeaAction, type IdeaGeneratorState } from "@/app/actions";
import { Loader2, Sparkles, User, Palette, Lightbulb, MessageSquareQuote } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import Link from "next/link";
import { Badge } from "../ui/badge";

const initialState: IdeaGeneratorState = {};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Idea...
                </>
            ) : (
                <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Tattoo Idea
                </>
            )}
        </Button>
    )
}

const TattooIdeaSection = () => {
    const [state, formAction] = useActionState(generateTattooIdeaAction, initialState);

    return (
        <section id="idea-generator" className="py-20 lg:py-32 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                <Card className="shadow-2xl border-none">
                    <CardHeader className="text-center">
                    <CardTitle className="font-headline text-4xl text-primary flex items-center justify-center gap-3">
                        <Lightbulb className="h-10 w-10" />
                        AI Tattoo Idea Generator
                    </CardTitle>
                    <CardDescription className="text-lg max-w-2xl mx-auto">
                        Stuck for ideas? Describe a concept, theme, or feeling, and let our AI provide you with a unique tattoo concept and an artist recommendation.
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <form action={formAction} className="space-y-6">
                        <div className="space-y-2">
                             <Textarea
                                id="prompt"
                                name="prompt"
                                placeholder="e.g., 'a majestic lion wearing a crown made of stars', 'a delicate cherry blossom branch twisting around a dagger', or 'a geometric wolf howling at a watercolor moon'"
                                rows={4}
                                required
                                minLength={10}
                                className="text-base"
                            />
                            {state.fieldErrors?.prompt && <p className="text-destructive text-sm">{state.fieldErrors.prompt[0]}</p>}
                        </div>
                        <SubmitButton />
                    </form>

                    {state.error && (
                         <Alert variant="destructive" className="mt-6">
                            <AlertTitle>Generation Failed</AlertTitle>
                            <AlertDescription>{state.error}</AlertDescription>
                        </Alert>
                    )}

                    {state.result && (
                        <div className="mt-8 pt-6 border-t border-border/50 animate-fade-in space-y-6">
                            <h3 className="text-2xl font-headline text-center text-primary">Your Tattoo Concept</h3>
                            <Card className="bg-background/50">
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                         <div className="flex items-start gap-4">
                                            <MessageSquareQuote className="h-6 w-6 mt-1 text-accent flex-shrink-0"/>
                                            <div>
                                                <h4 className="font-semibold text-lg">Creative Vision</h4>
                                                <p className="text-foreground/80">{state.result.creativeDescription}</p>
                                            </div>
                                        </div>
                                         <div className="flex items-start gap-4">
                                            <Palette className="h-6 w-6 mt-1 text-accent flex-shrink-0"/>
                                            <div>
                                                <h4 className="font-semibold text-lg">Recommended Style</h4>
                                                <p className="text-foreground/80"><Badge variant="secondary">{state.result.recommendedStyle}</Badge></p>
                                            </div>
                                        </div>
                                         <div className="flex items-start gap-4">
                                            <User className="h-6 w-6 mt-1 text-accent flex-shrink-0"/>
                                            <div>
                                                <h4 className="font-semibold text-lg">Suggested Artist</h4>
                                                <p className="text-foreground/80">{state.result.recommendedArtist}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 text-center">
                                        <Button asChild>
                                            <Link href="#contact">Book a Consultation</Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                    </CardContent>
                </Card>
                </div>
            </div>
        </section>
    );
}

export default TattooIdeaSection;
