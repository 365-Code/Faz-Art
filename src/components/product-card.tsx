import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ProductType } from "@/lib/types";
import { Badge } from "./ui/badge";

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <Link href={"/products/" + product.id}>
      <Card className="group/product group relative aspect-square mx-auto cursor-pointer overflow-hidden border-0 shadow-lg transition-shadow duration-300 hover:shadow-xl">
        {/* Background Image */}
        <Image
          src={product.images[0].url || "/placeholder.svg"}
          alt={product.slug}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <CardHeader className="absolute bottom-0 z-10 text-white w-full">
          <div className="opacity-100 group-hover/product:opacity-0 py-4 transition-all space-y-2">
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>
              <Badge variant={"secondary"}>{product.categoryId.name}</Badge>
            </CardDescription>
          </div>
        </CardHeader>
        <CardHeader className="absolute bottom-0 z-10 w-full py-4">
          <CardDescription className="text-white opacity-0 group-hover/product:opacity-100 transition-all">
            {product.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
