"use client";
import { useState } from "react";
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
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
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
import { deleteCategory } from "@/lib/actions"; // Import the deleteCategory server action
import type { CategoryType } from "@/lib/types";
import { Badge } from "../ui/badge";
import { EditCategoryDialog } from "./edit-category-dialog"; // Import the new edit dialog

const CategoryManagement = ({
  categories,
  currentPage,
  pageCount,
}: {
  categories: CategoryType[];
  pageCount: number;
  currentPage: number;
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryType | null>(
    null
  );
  const [confirmSlug, setConfirmSlug] = useState("");
  const [isDeleting, setIsDeleting] = useState(false); // New loading state for delete

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryType | null>(
    null
  );

  const handleDeleteClick = (category: CategoryType) => {
    setCategoryToDelete(category);
    setIsDeleteDialogOpen(true);
    setConfirmSlug(""); // Reset confirmation input
  };

  const handleEditClick = (category: CategoryType) => {
    setCategoryToEdit(category);
    setIsEditDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete || confirmSlug !== categoryToDelete.slug) {
      toast.error(
        "Slug does not match. Please type the correct slug to confirm."
      );
      return;
    }

    setIsDeleting(true); // Start loading for delete
    try {
      await deleteCategory(categoryToDelete.id);
      toast.success(
        `Category "${categoryToDelete.name}" deleted successfully!`
      );
      setIsDeleteDialogOpen(false);
      setCategoryToDelete(null);
    } catch (error) {
      toast.error("Failed to delete category.");
      console.error("Error deleting category:", error);
    } finally {
      setIsDeleting(false); // End loading for delete
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id.toString()}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {category.description}
                </TableCell>
                <TableCell>
                  {/* <Badge>{}</Badge> */}
                  <Image
                    unoptimized
                    src={category.image.url || "/placeholder.svg"} // Use category.image.url
                    width={70}
                    height={70}
                    alt={category.slug}
                    className="object-cover rounded-md aspect-square"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditClick(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteClick(category)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {pageCount > 1 && (
        <CardFooter className="pt-6">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <>
                  <PaginationItem>
                    <PaginationPrevious
                      href={`/admin/categories?page=${
                        currentPage - 1 < 1 ? 1 : currentPage - 1
                      }`}
                    />
                  </PaginationItem>
                </>
              )}
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationLink
                    href="/admin/categories?page=1"
                    isActive={false}
                  >
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
                      href={"/admin/categories?page=" + pageCount}
                    >
                      {pageCount}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href={`/admin/categories?page=${
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the category{" "}
              <Badge variant={"secondary"}>{categoryToDelete?.name}</Badge>
              ?
              <br />
              This action cannot be undone. To confirm, please type the
              category&apos;s slug:{" "}
              <span className="font-mono text-sm bg-muted px-2 py-1 rounded-md">
                {categoryToDelete?.slug}
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="confirmSlug">
              Type{" "}
              <Badge variant={"destructive"}>{categoryToDelete?.name}</Badge> to
              confirm
            </Label>
            <Input
              id="confirmSlug"
              value={confirmSlug}
              onChange={(e) => setConfirmSlug(e.target.value)}
              placeholder={categoryToDelete?.slug}
              disabled={isDeleting} // Disable input during deletion
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={confirmSlug !== categoryToDelete?.slug || isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Category"}
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
    </Card>
  );
};

export default CategoryManagement;
