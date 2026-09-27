"use client";

import { useState } from "react";
import Image from "next/image";
import { Edit, FolderOpen, ImageIcon, Loader2, Trash2 } from "lucide-react";

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
import { Badge } from "@/components/ui/badge";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { deleteCategory } from "@/lib/actions";
import type { CategoryType } from "@/lib/types";
import { EditCategoryDialog } from "./edit-category-dialog";

type CategoryManagementProps = {
  categories: CategoryType[];
  pageCount: number;
  currentPage: number;
};

const CategoryManagement = ({
  categories,
  pageCount,
  currentPage,
}: CategoryManagementProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryType | null>(
    null,
  );
  const [confirmSlug, setConfirmSlug] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryType | null>(
    null,
  );

  const handleDeleteClick = (category: CategoryType) => {
    setCategoryToDelete(category);
    setConfirmSlug("");
    setIsDeleteDialogOpen(true);
  };

  const handleEditClick = (category: CategoryType) => {
    setCategoryToEdit(category);
    setIsEditDialogOpen(true);
  };

  const handleDeleteDialogChange = (open: boolean) => {
    if (isDeleting) return;

    setIsDeleteDialogOpen(open);

    if (!open) {
      setCategoryToDelete(null);
      setConfirmSlug("");
    }
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) {
      return;
    }

    if (confirmSlug !== categoryToDelete.slug) {
      toast.error("Slug does not match. Please type the exact category slug.");
      return;
    }

    setIsDeleting(true);

    try {
      await deleteCategory(categoryToDelete.id);

      toast.success(
        `Category "${categoryToDelete.name}" deleted successfully.`,
      );

      setIsDeleteDialogOpen(false);
      setCategoryToDelete(null);
      setConfirmSlug("");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const renderPagination = () => {
    if (pageCount <= 1) {
      return null;
    }

    const pages: (number | "ellipsis")[] = [];

    if (pageCount <= 5) {
      for (let page = 1; page <= pageCount; page++) {
        pages.push(page);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis");
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(pageCount - 1, currentPage + 1);

      for (let page = startPage; page <= endPage; page++) {
        pages.push(page);
      }

      if (currentPage < pageCount - 2) {
        pages.push("ellipsis");
      }

      pages.push(pageCount);
    }

    return (
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={`/admin/categories?page=${currentPage - 1}`}
                aria-label="Go to previous page"
              />
            </PaginationItem>
          )}

          {pages.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href={`/admin/categories?page=${page}`}
                  isActive={page === currentPage}
                  aria-label={`Go to page ${page}`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {currentPage < pageCount && (
            <PaginationItem>
              <PaginationNext
                href={`/admin/categories?page=${currentPage + 1}`}
                aria-label="Go to next page"
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-muted/20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5" />
                Categories Management
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Manage your marble categories and their images.
              </p>
            </div>

            <Badge variant="secondary" className="w-fit">
              {categories.length}{" "}
              {categories.length === 1 ? "category" : "categories"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {categories.length === 0 ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                <FolderOpen className="h-7 w-7 text-muted-foreground" />
              </div>

              <h3 className="text-lg font-semibold">No categories yet</h3>

              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                There are no categories on this page yet. Use the{" "}
                <span className="font-medium">Add Category</span> button above
                to create your first category.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[220px] px-6 py-3">
                      Category
                    </TableHead>
                    <TableHead className="min-w-[280px] px-6 py-3">
                      Description
                    </TableHead>
                    <TableHead className="w-[100px] px-6 py-3">Image</TableHead>
                    <TableHead className="w-[140px] px-6 py-3 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id.toString()} className="group">
                      <TableCell className="px-6 py-4">
                        <div className="flex flex-col gap-1.5">
                          <span className="font-medium">{category.name}</span>
                          <span className="font-mono text-xs text-muted-foreground">
                            {category.slug}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <p
                          className="max-w-md truncate text-sm text-muted-foreground"
                          title={category.description}
                        >
                          {category.description || "No description"}
                        </p>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        {category.image?.url ? (
                          <div className="relative h-14 w-14 overflow-hidden rounded-lg border bg-muted">
                            <Image
                              unoptimized
                              src={category.image.url}
                              fill
                              sizes="56px"
                              alt={`${category.name} category`}
                              className="object-cover transition-transform duration-200 group-hover:scale-105"
                            />
                          </div>
                        ) : (
                          <div className="flex h-14 w-14 items-center justify-center rounded-lg border bg-muted">
                            <ImageIcon className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditClick(category)}
                            aria-label={`Edit ${category.name}`}
                            title={`Edit ${category.name}`}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteClick(category)}
                            aria-label={`Delete ${category.name}`}
                            title={`Delete ${category.name}`}
                            disabled={isDeleting}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>

        {pageCount > 1 && (
          <CardFooter className="flex flex-col gap-4 border-t bg-muted/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Page
              <span className="font-medium text-foreground">{currentPage}</span>
              of
              <span className="font-medium text-foreground">{pageCount}</span>
            </p>

            {renderPagination()}
          </CardFooter>
        )}
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={handleDeleteDialogChange}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Delete Category?</DialogTitle>

            <DialogDescription>
              This action cannot be undone. You are about to permanently delete:
            </DialogDescription>
          </DialogHeader>

          {categoryToDelete && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg border bg-muted/40 p-3">
                {categoryToDelete.image?.url ? (
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border bg-muted">
                    <Image
                      unoptimized
                      src={categoryToDelete.image.url}
                      fill
                      sizes="48px"
                      alt={categoryToDelete.name}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border bg-muted">
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate font-semibold">
                    {categoryToDelete.name}
                  </p>

                  <p className="truncate font-mono text-xs text-muted-foreground">
                    {categoryToDelete.slug}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                <p className="text-sm text-muted-foreground">
                  To confirm deletion, type the category slug exactly:
                </p>

                <code className="mt-2 block break-all rounded-md bg-muted px-3 py-2 text-sm font-semibold">
                  {categoryToDelete.slug}
                </code>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmSlug">Confirmation slug</Label>

                <Input
                  id="confirmSlug"
                  value={confirmSlug}
                  onChange={(event) => setConfirmSlug(event.target.value)}
                  placeholder={categoryToDelete.slug}
                  disabled={isDeleting}
                  autoComplete="off"
                  autoFocus
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDeleteDialogChange(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={
                !categoryToDelete ||
                confirmSlug !== categoryToDelete.slug ||
                isDeleting
              }
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Category
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      {categoryToEdit && (
        <EditCategoryDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          category={categoryToEdit}
        />
      )}
    </>
  );
};

export default CategoryManagement;
