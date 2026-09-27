"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
import {
  Edit,
  Trash2,
  Package,
  AlertTriangle,
} from "lucide-react";
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
import { deleteProduct } from "@/lib/actions";
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
  const router = useRouter();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] =
    useState<ProductType | null>(null);
  const [confirmSlug, setConfirmSlug] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<ProductType | null>(null);

  const handleDeleteClick = (product: ProductType) => {
    setProductToDelete(product);
    setConfirmSlug("");
    setIsDeleteDialogOpen(true);
  };

  const handleEditClick = (product: ProductType) => {
    setProductToEdit(product);
    setIsEditDialogOpen(true);
  };

  const handleDeleteDialogChange = (open: boolean) => {
    if (isDeleting) return;

    setIsDeleteDialogOpen(open);

    if (!open) {
      setProductToDelete(null);
      setConfirmSlug("");
    }
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    if (confirmSlug.trim() !== productToDelete.slug) {
      toast.error("The product slug does not match.");
      return;
    }

    setIsDeleting(true);

    try {
      await deleteProduct(productToDelete.id);

      toast.success(`"${productToDelete.name}" has been deleted.`);

      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
      setConfirmSlug("");

      router.refresh();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const hasProducts = products.length > 0;

  return (
    <>
      <Card className="overflow-hidden">
        {/* Header */}
        <CardHeader className="border-b bg-muted/20 px-6 py-5">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Package className="h-5 w-5 text-muted-foreground" />
              Products
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              Manage your products, categories, descriptions, images, and
              catalog content.
            </p>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-0">
          {hasProducts ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b bg-muted/30 hover:bg-muted/30">
                    <TableHead className="w-[35%] min-w-[280px] px-6 py-4">
                      Product
                    </TableHead>

                    <TableHead className="min-w-[170px] px-6 py-4">
                      Category
                    </TableHead>

                    <TableHead className="min-w-[300px] px-6 py-4">
                      Description
                    </TableHead>

                    <TableHead className="w-[130px] px-6 py-4 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {products.map((product) => {
                    const image = product.images?.[0]?.url;

                    return (
                      <TableRow
                        key={product.id.toString()}
                        className="group border-b last:border-0 hover:bg-muted/20"
                      >
                        {/* Product */}
                        <TableCell className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-muted">
                              {image ? (
                                <Image
                                  src={image}
                                  alt={product.name}
                                  fill
                                  sizes="64px"
                                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                  <Package className="h-6 w-6 text-muted-foreground" />
                                </div>
                              )}
                            </div>

                            <div className="min-w-0 space-y-1">
                              <p
                                className="truncate font-medium"
                                title={product.name}
                              >
                                {product.name}
                              </p>

                              <p
                                className="truncate font-mono text-xs text-muted-foreground"
                                title={product.slug}
                              >
                                /{product.slug}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        {/* Category */}
                        <TableCell className="px-6 py-5">
                          <Badge
                            variant="secondary"
                            className="whitespace-nowrap font-normal"
                          >
                            {product.categoryId.name}
                          </Badge>
                        </TableCell>

                        {/* Description */}
                        <TableCell className="px-6 py-5">
                          <p
                            className="max-w-md truncate text-sm leading-6 text-muted-foreground"
                            title={product.description}
                          >
                            {product.description || "No description provided"}
                          </p>
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="px-6 py-5">
                          <div className="flex justify-end gap-2">
                            <Button
                              type="button"
                              size="icon"
                              variant="outline"
                              className="h-9 w-9"
                              onClick={() => handleEditClick(product)}
                              aria-label={`Edit ${product.name}`}
                              title="Edit product"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>

                            <Button
                              type="button"
                              size="icon"
                              variant="outline"
                              className="h-9 w-9 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                              onClick={() => handleDeleteClick(product)}
                              aria-label={`Delete ${product.name}`}
                              title="Delete product"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex min-h-[360px] flex-col items-center justify-center px-6 py-16 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                <Package className="h-7 w-7 text-muted-foreground" />
              </div>

              <h3 className="text-lg font-semibold">No products yet</h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                There are currently no products in your catalog. Use the{" "}
                <span className="font-medium text-foreground">
                  Add Product
                </span>{" "}
                button in the admin header to create your first product.
              </p>
            </div>
          )}
        </CardContent>

        {/* Pagination */}
        {pageCount > 1 && (
          <CardFooter className="border-t bg-muted/10 px-6 py-5">
            <div className="flex w-full justify-center">
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        href={`/admin/products?page=${currentPage - 1}`}
                      />
                    </PaginationItem>
                  )}

                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationLink
                        href="/admin/products?page=1"
                        isActive={currentPage === 1}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {currentPage > 2 && currentPage < pageCount && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationLink
                      href={`/admin/products?page=${currentPage}`}
                      isActive
                    >
                      {currentPage}
                    </PaginationLink>
                  </PaginationItem>

                  {currentPage < pageCount - 1 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {currentPage < pageCount && (
                    <PaginationItem>
                      <PaginationLink
                        href={`/admin/products?page=${pageCount}`}
                      >
                        {pageCount}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {currentPage < pageCount && (
                    <PaginationItem>
                      <PaginationNext
                        href={`/admin/products?page=${currentPage + 1}`}
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          </CardFooter>
        )}
      </Card>

      {/* Delete Confirmation */}
      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={handleDeleteDialogChange}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>

            <DialogTitle>Delete product?</DialogTitle>

            <DialogDescription className="leading-6">
              This action cannot be undone. The product and its catalog
              information will be permanently removed.
            </DialogDescription>
          </DialogHeader>

          {productToDelete && (
            <div className="space-y-5">
              <div className="rounded-lg border bg-muted/40 p-4">
                <p className="font-medium">{productToDelete.name}</p>

                <p className="mt-1 break-all font-mono text-xs text-muted-foreground">
                  {productToDelete.slug}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmSlug">
                  Type the product slug to confirm
                </Label>

                <Input
                  id="confirmSlug"
                  value={confirmSlug}
                  onChange={(event) => setConfirmSlug(event.target.value)}
                  placeholder={productToDelete.slug}
                  autoComplete="off"
                  disabled={isDeleting}
                />

                <p className="text-xs text-muted-foreground">
                  Enter exactly{" "}
                  <span className="font-mono font-medium text-foreground">
                    {productToDelete.slug}
                  </span>
                </p>
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
                isDeleting ||
                !productToDelete ||
                confirmSlug !== productToDelete.slug
              }
            >
              {isDeleting ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Product
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product */}
      {productToEdit && (
        <EditProductDialog
          isOpen={isEditDialogOpen}
          onOpenChange={(open) => {
            setIsEditDialogOpen(open);

            if (!open) {
              setProductToEdit(null);
            }
          }}
          product={productToEdit}
          categories={categories}
        />
      )}
    </>
  );
};

export default ProductManagement;