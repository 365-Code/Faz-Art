"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { ProductType, ProductVariantType, VariantType } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";

export default function ProductDetailsClient({
  product,
}: {
  product: ProductType;
}) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<{
    id: string;
    url: string;
  }>(product.images[0]);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb and Back Button Section */}
      <section className="py-6 border-b border-border/50 bg-gradient-to-br from-background to-muted/30">
        <div className="mx-auto container px-4 flex items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="flex items-center">
                    <Home className="h-4 w-4 mr-1" />
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/collections">Collections</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/collections/${product.categoryId.id}`}>
                    {product.categoryId.name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </section>

      {/* Product Details Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 xl:grid-cols-5">
          {/* Image Gallery */}
          <div className="lg:col-span-2 xl:col-span-3">
            <div className="flex h-full flex-col space-y-6 md:flex-row-reverse md:justify-between md:space-x-6 md:space-y-0">
              {/* Main Image */}
              <div className="flex-1 w-full h-[500px] md:h-[600px] mx-auto">
                {/* Added fixed height for the container */}
                <Card className="relative aspect-square  h-full overflow-hidden rounded-xl border-0 shadow-lg flex items-center justify-center p-0">
                  {/* Removed aspect-square, added flex for centering */}
                  <Image
                    src={selectedImage.url || "/image-placeholder.svg"}
                    alt={product.name}
                    fill
                    // width={500}
                    // height={500}
                    className="rounded-xl w-fit h-fit object-contain transition-all duration-300"
                    priority
                  />
                </Card>
              </div>

              {/* Thumbnail Images */}
              <div className="flex shrink-0 flex-row md:flex-col gap-4 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto no-scrollbar p-1">
                {product.images.map((image, i) => (
                  <Card
                    key={image.id}
                    className={`aspect-square p-0 min-w-24 min-h-24 sm:min-h-28 sm:min-w-28 cursor-pointer overflow-hidden border-2 transition-all duration-200 hover:shadow-md ${
                      selectedImage.id === image.id
                        ? "border-primary shadow-md"
                        : "border-border hover:border-muted-foreground"
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-square">
                        <Image
                          src={image.url || "/placeholder.svg"}
                          alt={`${product.name} thumbnail ${i + 1}`}
                          fill
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-10 lg:col-span-1 xl:col-span-2">
            <div className="space-y-6">
              <Badge
                variant="secondary"
                className="text-sm font-medium tracking-wide uppercase bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
              >
                {product.categoryId.name}
              </Badge>

              <div className="space-y-4">
                <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                  {product.name}
                </h1>
                <div className="h-px bg-gradient-to-r from-border to-transparent" />
              </div>

              <p className="text-lg leading-relaxed text-muted-foreground font-light">
                {product.description}
              </p>
            </div>

            <div className="space-y-4">
              <Separator />
              <ProductVariants product={product} />
            </div>

            <div>
              {/* tabs */}
              <Tabs defaultValue="info">
                <TabsList className="w-full">
                  <TabsTrigger value="info">Info</TabsTrigger>
                  <TabsTrigger value="size">Size</TabsTrigger>
                </TabsList>
                <TabsContent value="info">{product.description}</TabsContent>
                <TabsContent value="size">
                  <div className="grid grid-cols-2">
                    <div>
                      <div>
                        <span>Height: xyz</span>
                      </div>
                      <div>
                        <span>Width: xyz</span>
                      </div>
                    </div>
                    <div>
                      <div>
                        <span>Depth: xyz</span>
                      </div>
                      <div>
                        <span>Diameter: xyz</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Add to Cart / Call to Action (Placeholder) */}
              <div className="space-y-6 pt-8">
                <div className="h-px bg-gradient-to-r from-border to-transparent" />
                <Link
                  href={`https://wa.me/11234567890?text=I%20am%20interested%20in%20the%20${product.name}%20product.`} // Replace with actual WhatsApp number
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="w-full text-lg py-6">
                    Inquire About Product
                  </Button>
                </Link>
                {/* <Button
                variant="outline"
                size="lg"
                className="w-full text-lg py-6 bg-transparent"
              >
                Schedule a Consultation
              </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductVariants = ({
  product,
}: // productVariants,
{
  product: ProductType;
  // productVariants: ProductVariantType[];
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-900 tracking-wide uppercase">
          Color
        </h3>

        <p className="text-base text-gray-600 font-light">{"Silver"}</p>
      </div>

      <div className="flex space-x-4 h-8">
        {product.variantId.variants.map((variant) => (
          <Link key={variant.productId} href={"/products/" + variant.productId}>
            <Button
              className={`group relative h-12 w-12 rounded-full border-2 transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                product.id.toString() === variant.productId
                  ? "border-gray-900 shadow-lg scale-110"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              style={{ backgroundColor: variant.colorCode }}
              aria-label={`Select ${variant.colorName}`}
            >
              {/* Inner ring for selected state */}

              {product.id.toString() === variant.productId && (
                <div className="absolute inset-1 rounded-full border-2 border-white shadow-inner" />
              )}

              {/* Special border for white variant */}

              {variant.colorCode === product.colorCode && (
                <div className="absolute inset-0 rounded-full border border-gray-200" />
              )}

              {/* Hover effect */}

              <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};
