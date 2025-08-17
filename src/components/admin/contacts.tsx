"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Mail, Phone, User, MessageSquare } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ContactType } from "@/lib/types";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type ContactsProps = {
  contacts: ContactType[];
  pageCount: number;
  currentPage: number;
};

const Contacts = ({ contacts, pageCount, currentPage }: ContactsProps) => {
  const [isContactOpen, setContactOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactType | null>(
    null
  );

  const handleViewContact = (contact: ContactType) => {
    setSelectedContact(contact);
    setContactOpen(true);
  };

  return (
    <Card className="border-0 bg-card/50 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl font-heading">
          <MessageSquare className="h-5 w-5 text-muted-foreground" />
          Contact Inquiries
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Manage customer inquiries and contact requests
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/40">
                <TableHead className="font-semibold">Client</TableHead>
                <TableHead className="font-semibold">Contact Info</TableHead>
                <TableHead className="font-semibold">Subject</TableHead>
                <TableHead className="font-semibold">Message Preview</TableHead>
                <TableHead className="font-semibold text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact, index) => (
                <TableRow
                  key={contact.id.toString()}
                  className="hover:bg-muted/20 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {contact.firstName} {contact.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Contact #{String(index + 1).padStart(3, "0")}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="truncate max-w-[200px]">
                          {contact.email}
                        </span>
                      </div>
                      {contact.phone && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          <span>{contact.phone}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {contact.subject}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate text-sm text-muted-foreground">
                      {contact.message}
                    </p>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleViewContact(contact)}
                      className="h-8 w-8 p-0 hover:bg-primary/10"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {pageCount > 1 && (
        <CardFooter className="pt-6">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <>
                  <PaginationItem>
                    <PaginationPrevious
                      href={`/admin?page=${
                        currentPage - 1 <= 0 ? 1 : currentPage - 1
                      }`}
                    />
                  </PaginationItem>
                </>
              )}
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationLink href="/admin?page=1" isActive={false}>
                    {1}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationLink href="" isActive={true}>
                  {currentPage}
                </PaginationLink>
              </PaginationItem>

              {currentPage < pageCount - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {currentPage != pageCount && pageCount > 1 && (
                <>
                  <PaginationItem>
                    <PaginationLink
                      isActive={currentPage == pageCount}
                      href={"/admin?page=" + pageCount}
                    >
                      {pageCount}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href={`/admin?page=${
                        currentPage + 1 > pageCount
                          ? pageCount
                          : currentPage + 1
                      }`}
                    />
                  </PaginationItem>
                </>
              )}
            </PaginationContent>
          </Pagination>
        </CardFooter>
      )}

      {selectedContact && (
        <ContactDialog
          isOpen={isContactOpen}
          onOpenChange={setContactOpen}
          contact={selectedContact}
        />
      )}
    </Card>
  );
};

export default Contacts;

const ContactDialog = ({
  isOpen,
  onOpenChange,
  contact,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  contact: ContactType;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="pb-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-heading">
                {contact.firstName} {contact.lastName}
              </DialogTitle>
              <DialogDescription className="text-base">
                Contact inquiry details
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Information Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Full Name
                </Label>
                <p className="text-base font-medium">
                  {contact.firstName} {contact.lastName}
                </p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Email Address
                </Label>
                <p className="text-base text-primary hover:underline cursor-pointer">
                  {contact.email}
                </p>
              </div>
              {contact.phone && (
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Phone Number
                  </Label>
                  <p className="text-base">{contact.phone}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Inquiry Details Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Inquiry Details
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Subject
                </Label>
                <Badge variant="outline" className="text-sm font-normal">
                  {contact.subject}
                </Badge>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Message
                </Label>
                <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                  <p className="text-base leading-relaxed whitespace-pre-wrap">
                    {contact.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-border/50">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Mail className="h-4 w-4 mr-2" />
            Reply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
