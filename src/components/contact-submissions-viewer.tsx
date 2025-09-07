// src/components/contact-submissions-viewer.tsx
"use client";

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteAppointmentRequest, getAppointmentRequests, type AppointmentRequest } from '@/lib/firebase';
import { Skeleton } from './ui/skeleton';
import { format } from 'date-fns';
import { Button } from './ui/button';
import { Trash2, Download } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';


type ContactSubmissionsViewerProps = {
  initialData: AppointmentRequest[];
};

export default function ContactSubmissionsViewer({ initialData }: ContactSubmissionsViewerProps) {
  const [requests, setRequests] = useState<AppointmentRequest[]>(initialData);
  const [loading, setLoading] = useState(initialData.length === 0);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = getAppointmentRequests((data) => {
      setRequests(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  
  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    try {
        await deleteAppointmentRequest(id);
        toast({
            title: "Success",
            description: "Appointment request deleted successfully."
        })
    } catch (error: any) {
        toast({
            title: "Error",
            description: error.message || "Failed to delete the request.",
            variant: "destructive"
        })
    } finally {
        setIsDeleting(null);
    }
  }

  const escapeCsvCell = (cell: string | number | undefined | null) => {
    if (cell === null || cell === undefined) {
      return '';
    }
    const str = String(cell);
    // If the string contains a comma, double quote, or newline, wrap it in double quotes.
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      // Also, double up any existing double quotes.
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const handleDownloadCsv = () => {
    const headers = [
      'Submitted', 'Full Name', 'Email', 'Phone', 'Preferred Artist', 
      'Style', 'Description', 'Budget', 'Timeframe'
    ];
    const rows = requests.map(req => [
      format(new Date(req.submittedAt), "yyyy-MM-dd HH:mm"),
      req.fullName,
      req.email,
      req.phone,
      req.preferredArtist,
      req.tattooStyle,
      req.tattooDescription,
      req.budgetRange,
      req.preferredTimeframe
    ].map(escapeCsvCell).join(','));

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.href) {
      URL.revokeObjectURL(link.href);
    }
    link.href = URL.createObjectURL(blob);
    link.download = 'appointments.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  if (loading) {
    return (
        <div className="space-y-4">
            {Array.from({length: 5}).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
            ))}
        </div>
    )
  }

  return (
    <div className="space-y-4">
       <div className="flex justify-end">
            <Button onClick={handleDownloadCsv} disabled={requests.length === 0}>
                <Download className="mr-2 h-4 w-4" />
                Download as CSV
            </Button>
       </div>
        {requests.length === 0 ? (
             <p className='text-center text-muted-foreground py-12'>No appointment requests have been submitted yet.</p>
        ) : (
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {requests.map((request) => (
                        <TableRow key={request.id}>
                        <TableCell className='whitespace-nowrap'>{format(new Date(request.submittedAt), "MMM d, yyyy")}</TableCell>
                        <TableCell>{request.fullName}</TableCell>
                        <TableCell>
                            <div className='text-sm'>{request.email}</div>
                            <div className='text-xs text-muted-foreground'>{request.phone}</div>
                        </TableCell>
                        <TableCell>
                            <div className='max-w-xs truncate'>{request.tattooDescription}</div>
                            <div className='text-xs text-muted-foreground'>
                                Artist: {request.preferredArtist || 'N/A'} | Style: {request.tattooStyle || 'N/A'}
                            </div>
                        </TableCell>
                        <TableCell className="text-right">
                           <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" disabled={isDeleting === request.id}>
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the appointment request from the database.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(request.id)} className="bg-destructive hover:bg-destructive/90">
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
        )}
    </div>
  );
}
