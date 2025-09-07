// src/components/contact-submissions-viewer.tsx
"use client";

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAppointmentRequests, type AppointmentRequest } from '@/lib/firebase';
import { Skeleton } from './ui/skeleton';
import { format } from 'date-fns';

type ContactSubmissionsViewerProps = {
  initialData: AppointmentRequest[];
};

export default function ContactSubmissionsViewer({ initialData }: ContactSubmissionsViewerProps) {
  const [requests, setRequests] = useState<AppointmentRequest[]>(initialData);
  const [loading, setLoading] = useState(initialData.length === 0);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = getAppointmentRequests((data) => {
      setRequests(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
        <div className="space-y-4">
            {Array.from({length: 5}).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
            ))}
        </div>
    )
  }

  if (requests.length === 0) {
    return <p className='text-center text-muted-foreground'>No appointment requests have been submitted yet.</p>;
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Submitted</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Preferred Artist</TableHead>
            <TableHead>Style</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{format(new Date(request.submittedAt), "MMM d, yyyy")}</TableCell>
              <TableCell>{request.fullName}</TableCell>
              <TableCell>{request.email}</TableCell>
              <TableCell>{request.phone}</TableCell>
              <TableCell>{request.preferredArtist || 'N/A'}</TableCell>
              <TableCell>{request.tattooStyle || 'N/A'}</TableCell>
              <TableCell className="max-w-xs truncate">{request.tattooDescription}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
