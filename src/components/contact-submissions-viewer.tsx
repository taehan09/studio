// src/components/contact-submissions-viewer.tsx
"use client";

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type AppointmentRequest } from '@/lib/firebase';
import { Skeleton } from './ui/skeleton';

const tableHeaders = [
    "Full Name", 
    "Email", 
    "Phone Number", 
    "Preferred Artist", 
    "Tattoo Style", 
    "Tattoo Description", 
    "Budget", 
    "Preferred Timeframe"
];

// Placeholder data for skeleton UI
const placeholderRequests = Array(5).fill({});

export default function ContactSubmissionsViewer() {
  const [requests, setRequests] = useState<AppointmentRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // NOTE: Data fetching logic will be added later.
  // For now, we simulate a loading state.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="border rounded-lg w-full">
        <Table>
            <TableHeader>
                <TableRow>
                {tableHeaders.map(header => <TableHead key={header}>{header}</TableHead>)}
                </TableRow>
            </TableHeader>
            <TableBody>
                {loading ? (
                    placeholderRequests.map((_, index) => (
                        <TableRow key={index}>
                            {tableHeaders.map(header => (
                                <TableCell key={header}><Skeleton className="h-6 w-full" /></TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : requests.length > 0 ? (
                    requests.map(request => (
                        <TableRow key={request.id}>
                            <TableCell>{request.fullName}</TableCell>
                            <TableCell>{request.email}</TableCell>
                            <TableCell>{request.phone}</TableCell>
                            <TableCell>{request.preferredArtist}</TableCell>
                            <TableCell>{request.tattooStyle}</TableCell>
                            <TableCell className="max-w-xs truncate">{request.tattooDescription}</TableCell>
                            <TableCell>{request.budgetRange}</TableCell>
                            <TableCell>{request.preferredTimeframe}</TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={tableHeaders.length} className="h-24 text-center">
                            No appointment requests have been submitted yet.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </div>
  );
}
