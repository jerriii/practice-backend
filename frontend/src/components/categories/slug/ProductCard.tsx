import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from "lucide-react"
import { Product } from "@/types/categories/slug"

interface ProductCardProps {
    product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div
            className="group border rounded-lg overflow-hidden bg-background"
        >
            <Link href={`/products/${product.id}`} className="block">
                <div className="relative aspect-square overflow-hidden">
                    <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {product.discount && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                            {product.discount}% OFF
                        </div>
                    )}
                </div>
            </Link>
            <div className="p-4">
                <Link href={`/products/${product.id}`} className="block">
                    <h3 className="font-medium group-hover:text-primary truncate">
                        {product.name}
                    </h3>
                    <div className="flex items-center mt-1 space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(product?.rating ?? 0)
                                    ? "fill-primary text-primary"
                                    : "text-muted-foreground"
                                    }`}
                            />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">
                            ({product.reviews})
                        </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center">
                            <span className="font-bold">
                                ${product.price.toFixed(2)}
                            </span>
                            {product.oldPrice && (
                                <span className="text-muted-foreground text-sm line-through ml-2">
                                    ${product.oldPrice.toFixed(2)}
                                </span>
                            )}
                        </div>
                    </div>
                </Link>
                <Button size="sm" className="w-full mt-3">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                </Button>
            </div>
        </div>
    )
}

export default ProductCard