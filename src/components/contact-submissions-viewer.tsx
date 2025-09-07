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
import { type AppointmentRequest, getAppointmentRequests } from '@/lib/firebase';
import { Skeleton } from './ui/skeleton';

const tableHeaders = [
    "Submitted At",
    "Full Name", 
    "Email", 
    "Phone Number", 
    "Preferred Artist", 
];

type ContactSubmissionsViewerProps = {
    initialData: AppointmentRequest[];
};

export default function ContactSubmissionsViewer({ initialData }: ContactSubmissionsViewerProps) {
  const [requests, setRequests] = useState<AppointmentRequest[]>(
    initialData.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
  );
  const [loading, setLoading] = useState(initialData.length === 0);

  useEffect(() => {
    const unsubscribe = getAppointmentRequests((data) => {
      setRequests(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  return (
    <div className="border rounded-lg w-full">
        <Table>
            <TableHeader>
                <TableRow>
                {tableHeaders.map(header => <TableHead key={header}>{header}</TableHead>)}
                <TableHead>Description</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {loading ? (
                    Array(5).fill({}).map((_, index) => (
                        <TableRow key={index}>
                            {[...tableHeaders, "Description"].map(header => (
                                <TableCell key={header}><Skeleton className="h-6 w-full" /></TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : requests.length > 0 ? (
                    requests.map(request => (
                        <TableRow key={request.id}>
                            <TableCell>{new Date(request.submittedAt).toLocaleString()}</TableCell>
                            <TableCell>{request.fullName}</TableCell>
                            <TableCell>{request.email}</TableCell>
                            <TableCell>{request.phone}</TableCell>
                            <TableCell>{request.preferredArtist || 'N/A'}</TableCell>
                            <TableCell className="max-w-xs truncate" title={request.tattooDescription}>
                                {request.tattooDescription}
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={tableHeaders.length + 1} className="h-24 text-center">
                            No appointment requests have been submitted yet.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </div>
  );
}
