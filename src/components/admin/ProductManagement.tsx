"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import type { CategoryType, ProductType } from "@/lib/types";
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
import { deleteProduct } from "@/lib/actions"; // Import the deleteProduct server action
import { EditProductDialog } from "./edit-product-dialog";

const ProductManagement = ({
  products,
  currentPage,
  pageCount,
  categories,
}: {
  products: ProductType[];
  currentPage: number;
  pageCount: number;
  categories: CategoryType[];
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<ProductType | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false); // New loading state for delete

  const [confirmSlug, setConfirmSlug] = useState("");

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<ProductType | null>(null);

  const handleDeleteClick = (product: ProductType) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
    setConfirmSlug(""); // Reset confirmation input
  };

  const handleEditClick = (product: ProductType) => {
    setProductToEdit(product);
    setIsEditDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete || confirmSlug !== productToDelete.slug) {
      toast.error(
        "Slug does not match. Please type the correct slug to confirm."
      );
      return;
    }
    setIsDeleting(true); // Start loading for delete
    try {
      await deleteProduct(productToDelete.id);
      toast.success(`Product "${productToDelete.name}" deleted successfully!`);
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    } catch (error) {
      toast.error("Failed to delete product.");
      console.error("Error deleting product:", error);
    } finally {
      setIsDeleting(false); // End loading for delete
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Products Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id.toString()}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {String(product.categoryId.name)}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {product.description}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditClick(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteClick(product)}
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
                      href={`/admin/products?page=${
                        currentPage - 1 <= 0 ? 1 : currentPage - 1
                      }`}
                    />
                  </PaginationItem>
                </>
              )}
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationLink
                    href="/admin/products?page=1"
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
                      href={"/admin/products?page=" + pageCount}
                    >
                      {pageCount}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href={`/admin/products?page=${
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
      {!pageCount && (
        <CardFooter className="mx-auto">
          No Product Added to Catalog Yet
        </CardFooter>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the product{" "}
              <Badge variant={"secondary"}>{productToDelete?.name}</Badge>
              ?
              <br />
              This action cannot be undone. To confirm, please type the
              product&apos;s slug:{" "}
              <span className="font-mono text-sm bg-muted px-2 py-1 rounded-md">
                {productToDelete?.slug}
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="confirmSlug">Type slug to confirm</Label>
            <Input
              id="confirmSlug"
              value={confirmSlug}
              onChange={(e) => setConfirmSlug(e.target.value)}
              placeholder={productToDelete?.slug}
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
              disabled={confirmSlug !== productToDelete?.slug}
            >
              {isDeleting ? "Deleting..." : "Delete Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      {productToEdit && (
        <EditProductDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          product={productToEdit}
          categories={categories}
          // onProductUpdated={onProductUpdated}
        />
      )}
    </Card>
  );
};

export default ProductManagement;
