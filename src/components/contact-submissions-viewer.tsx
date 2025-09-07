// src/components/contact-submissions-viewer.tsx
"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { getAppointmentRequests, type AppointmentRequest } from "@/lib/firebase";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent } from "./ui/card";

export default function ContactSubmissionsViewer({ initialData }: { initialData: AppointmentRequest[] }) {
    // Sort initial data and set it as the starting state
    const [requests, setRequests] = useState<AppointmentRequest[]>(
        initialData.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    );
    const [loading, setLoading] = useState(initialData.length === 0);

    useEffect(() => {
        // Subscribe to real-time updates
        const unsubscribe = getAppointmentRequests((data) => {
            const sortedData = data ? data.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()) : [];
            setRequests(sortedData);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        )
    }

    if (requests.length === 0) {
        return <p>No appointment requests have been submitted yet.</p>;
    }

    return (
        <Card>
            <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[150px]">Date</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Preferred Artist</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.map((request) => (
                                <AccordionItem value={request.id} key={request.id} asChild>
                                    <>
                                    <TableRow>
                                        <TableCell>{request.submittedAt ? format(new Date(request.submittedAt), "PPP") : 'N/A'}</TableCell>
                                        <TableCell>{request.fullName}</TableCell>
                                        <TableCell>{request.email}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{request.preferredArtist}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <AccordionTrigger className="p-2"/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={5} className="p-0">
                                            <AccordionContent>
                                                <div className="p-6 bg-muted/50">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                        <div className="space-y-1">
                                                            <p className="font-semibold">Phone</p>
                                                            <p className="text-muted-foreground">{request.phone}</p>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="font-semibold">Style</p>
                                                            <p className="text-muted-foreground">{request.tattooStyle || 'N/A'}</p>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="font-semibold">Budget</p>
                                                            <p className="text-muted-foreground">{request.budgetRange || 'N/A'}</p>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="font-semibold">Timeframe</p>
                                                            <p className="text-muted-foreground">{request.preferredTimeframe || 'N/A'}</p>
                                                        </div>
                                                        <div className="space-y-1 col-span-full">
                                                            <p className="font-semibold">Full Description</p>
                                                            <p className="text-muted-foreground whitespace-pre-wrap">{request.tattooDescription}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </TableCell>
                                    </TableRow>
                                    </>
                                </AccordionItem>
                            ))}
                        </TableBody>
                    </Table>
                </Accordion>
            </CardContent>
        </Card>
    );
}
