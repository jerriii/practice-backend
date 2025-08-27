import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  Shield,
  Check,
  Minus,
  Plus,
} from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // In a real app, fetch the product data based on params.id
  const product = {
    id: params.id,
    name: "Wireless Noise Cancelling Headphones",
    price: 249.99,
    oldPrice: 299.99,
    discount: 15,
    rating: 4.8,
    description:
      "Experience immersive sound with these premium wireless noise cancelling headphones. Perfect for travel, work, or relaxation, these headphones deliver exceptional audio quality with deep bass and crystal-clear highs. The comfortable over-ear design and long battery life make them ideal for all-day use.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    features: [
      "Active Noise Cancellation Technology",
      "40-hour Battery Life",
      "Bluetooth 5.0 Connectivity",
      "Built-in Microphone for Calls",
      "Comfortable Memory Foam Ear Cushions",
      "Foldable Design for Easy Storage",
    ],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Silver", value: "#C0C0C0" },
      { name: "Blue", value: "#0000FF" },
    ],
    inStock: true,
    sku: "WH-1000XM4",
    categoryId: "headphones",
    category: "Headphones",
    brand: "SoundMaster",
    brandId: "soundmaster",
    specifications: [
      { name: "Battery Life", value: "Up to 40 hours" },
      { name: "Connectivity", value: "Bluetooth 5.0, 3.5mm audio cable" },
      {
        name: "Charging",
        value: "USB-C, Fast charging (5 min = 3 hours playback)",
      },
      { name: "Weight", value: "254g" },
      { name: "Dimensions", value: "7.3 x 3.0 x 9.9 inches" },
      { name: "Frequency Response", value: "4Hz-40,000Hz" },
      { name: "Impedance", value: "47 ohms" },
    ],
    relatedProducts: [
      {
        id: "2",
        name: "Premium Bluetooth Speaker",
        price: 79.99,
        rating: 4.6,
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: "3",
        name: "Smart Earbuds Pro",
        price: 129.99,
        rating: 4.7,
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: "4",
        name: "DJ Professional Headset",
        price: 349.99,
        rating: 4.9,
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "John D.",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        date: "October 15, 2023",
        title: "Best headphones I've ever owned",
        comment:
          "These headphones are absolutely amazing. The noise cancellation is top-notch and the sound quality is incredible. Battery life is excellent too!",
      },
      {
        id: 2,
        user: "Sarah M.",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        date: "September 28, 2023",
        title: "Great sound, slightly tight fit",
        comment:
          "The sound quality and noise cancellation are excellent. My only complaint is that they're a bit tight on my head after a few hours of use. Otherwise, they're fantastic.",
      },
    ],
  };

  return (
    <div className="container mx-auto lg:px-8 px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-muted-foreground">/</span>
              <Link
                href="/products"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Products
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-muted-foreground">/</span>
              <Link
                href={`/categories/${product.categoryId}`}
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                {product.category}
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="text-sm font-medium truncate max-w-[200px]">
                {product.name}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.discount && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                {product.discount}% OFF
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`relative aspect-square overflow-hidden rounded-md border ${index === 0 ? "ring-2 ring-primary" : ""}`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <Link
                href="#reviews"
                className="text-sm text-muted-foreground hover:text-primary ml-2"
              >
                {product.reviews.length} reviews
              </Link>
              <div className="mx-2 text-muted-foreground">|</div>
              <Link
                href={`/brands/${product.brandId}`}
                className="text-sm hover:text-primary"
              >
                {product.brand}
              </Link>
            </div>
          </div>

          <div className="flex items-baseline">
            <span className="text-3xl font-bold">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-muted-foreground text-lg line-through ml-2">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          {/* Color Selection */}
          <div>
            <h3 className="text-sm font-medium mb-3">Color</h3>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  className="relative w-9 h-9 rounded-full border focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  {color.name === "Black" && (
                    <Check className="absolute inset-0 m-auto h-5 w-5 text-white" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="text-sm font-medium mb-3">Quantity</h3>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">1</span>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center space-x-2">
            <div
              className={`h-3 w-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`}
            ></div>
            <span
              className={product.inStock ? "text-green-600" : "text-red-600"}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
            <span className="text-muted-foreground text-sm">
              SKU: {product.sku}
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button className="w-full sm:w-auto" size="lg">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Heart className="mr-2 h-5 w-5" />
              Add to Wishlist
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Share product</span>
            </Button>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-b py-6">
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Free shipping over $50</span>
            </div>
            <div className="flex items-center space-x-2">
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">30-day returns</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">2-year warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="features" className="mb-12">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
          <TabsTrigger
            value="features"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
          >
            Features
          </TabsTrigger>
          <TabsTrigger
            value="specifications"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
          >
            Specifications
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            id="reviews"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
          >
            Reviews
          </TabsTrigger>
        </TabsList>
        <TabsContent value="features" className="py-6">
          <div>
            <h3 className="text-xl font-medium mb-4">Product Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="py-6">
          <div>
            <h3 className="text-xl font-medium mb-4">
              Technical Specifications
            </h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y">
                <tbody className="divide-y">
                  {product.specifications.map((spec, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-muted/50" : ""}
                    >
                      <td className="px-4 py-3 text-sm font-medium">
                        {spec.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="py-6">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-medium">Customer Reviews</h3>
              <Button>Write a Review</Button>
            </div>

            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-center mb-2">
                    <Image
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.user}
                      width={40}
                      height={40}
                      className="rounded-full mr-3"
                    />
                    <div>
                      <div className="font-medium">{review.user}</div>
                      <div className="text-sm text-muted-foreground">
                        {review.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <h4 className="font-medium mb-1">{review.title}</h4>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {product.relatedProducts.map((item) => (
            <Link
              key={item.id}
              href={`/products/${item.id}`}
              className="group overflow-hidden rounded-lg border bg-background p-3 transition-colors hover:bg-muted/50"
            >
              <div className="relative aspect-square overflow-hidden rounded-md">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="pt-3">
                <h3 className="font-medium group-hover:text-primary truncate">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <p className="font-bold">${item.price.toFixed(2)}</p>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm ml-1">{item.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
