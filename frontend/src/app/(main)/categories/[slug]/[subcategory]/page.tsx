import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ShoppingCart, Star, Search } from "lucide-react";

function SubcategoryPage({
  params,
}: {
  params: { slug: string; subcategory: string };
}) {
  // In a real app, fetch the category and subcategory data based on params
  const category = categories.find((cat) => cat.slug === params.slug);
  const subcategory = category?.subcategories.find(
    (sub) => sub.slug === params.subcategory
  );

  if (!category || !subcategory) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Category or Subcategory Not Found
        </h1>
        <p className="text-muted-foreground mb-6">
          The requested category or subcategory does not exist.
        </p>
        <Link href="/categories">
          <Button>Browse All Categories</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-w-full lg:px-8 px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
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
                href="/categories"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Categories
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-muted-foreground">/</span>
              <Link
                href={`/categories/${category.slug}`}
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                {category.name}
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="text-sm font-medium">{subcategory.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Subcategory Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{subcategory.name}</h1>
        <p className="text-muted-foreground">
          {subcategory.description ||
            `Browse our selection of ${subcategory.name} products.`}
        </p>
        <div className="text-sm text-muted-foreground mt-2">
          {subcategory.productCount} Products
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters */}
        <div className="w-full md:w-64 space-y-6">
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Filters</h3>
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                Reset All
              </Button>
            </div>

            <div className="space-y-4">
              {/* Price Range */}
              <div>
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    className="h-9 text-xs"
                  />
                  <span className="text-muted-foreground">to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              {/* Brand */}
              <div>
                <h4 className="font-medium mb-2">Brand</h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`brand-${brand.id}`}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label
                        htmlFor={`brand-${brand.id}`}
                        className="ml-2 text-sm text-muted-foreground"
                      >
                        {brand.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ratings */}
              <div>
                <h4 className="font-medium mb-2">Ratings</h4>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`rating-${rating}`}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label
                        htmlFor={`rating-${rating}`}
                        className="ml-2 text-sm text-muted-foreground flex items-center"
                      >
                        {Array.from({ length: rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 fill-primary text-primary"
                          />
                        ))}
                        {Array.from({ length: 5 - rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 text-muted-foreground"
                          />
                        ))}
                        <span className="ml-1">& Up</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="font-medium mb-2">Features</h4>
                <div className="space-y-2">
                  {features.map((feature) => (
                    <div key={feature.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`feature-${feature.id}`}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label
                        htmlFor={`feature-${feature.id}`}
                        className="ml-2 text-sm text-muted-foreground"
                      >
                        {feature.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="bg-muted mb-6 p-4 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={`Search in ${subcategory.name}...`}
                  className="pl-8 w-full sm:w-[300px]"
                />
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="featured">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subcategoryProducts.map((product) => (
              <div
                key={product.id}
                className="group border rounded-lg overflow-hidden bg-background"
              >
                <Link href={`/products/${product.id}`} className="block">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
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
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
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
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubcategoryPage;
// Sample data
const categories = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    subcategories: [
      {
        id: 101,
        name: "Smartphones",
        slug: "smartphones",
        productCount: 78,
        description:
          "Find the latest smartphones with cutting-edge features and technology.",
        icon: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 102,
        name: "Laptops",
        slug: "laptops",
        productCount: 45,
        description: "Powerful laptops for work, gaming, and everyday use.",
        icon: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 103,
        name: "Audio",
        slug: "audio",
        productCount: 62,
        description:
          "High-quality audio devices for an immersive sound experience.",
        icon: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: 3,
    name: "Home & Kitchen",
    slug: "home-kitchen",
    subcategories: [
      {
        id: 201,
        name: "Furniture",
        slug: "furniture",
        productCount: 56,
        description:
          "Stylish and functional furniture for every room in your home.",
        icon: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 202,
        name: "Appliances",
        slug: "appliances",
        productCount: 42,
        description:
          "Modern appliances to make your life easier and more efficient.",
        icon: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
];

const brands = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Samsung" },
  { id: 3, name: "Sony" },
  { id: 4, name: "LG" },
  { id: 5, name: "Bose" },
];

const features = [
  { id: 1, name: "Wireless" },
  { id: 2, name: "Bluetooth" },
  { id: 3, name: "Noise Cancelling" },
  { id: 4, name: "Waterproof" },
  { id: 5, name: "Fast Charging" },
];

const subcategoryProducts = [
  {
    id: "1",
    name: "Wireless Noise Cancelling Headphones",
    price: 249.99,
    oldPrice: 299.99,
    rating: 4.8,
    reviews: 245,
    discount: 15,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "2",
    name: "Premium Bluetooth Speaker",
    price: 79.99,
    rating: 4.6,
    reviews: 189,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "3",
    name: "Portable Wireless Earbuds",
    price: 129.99,
    oldPrice: 149.99,
    rating: 4.7,
    reviews: 124,
    discount: 20,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "4",
    name: "Professional Studio Headphones",
    price: 199.99,
    rating: 4.9,
    reviews: 87,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "5",
    name: "Smart Soundbar",
    price: 249.99,
    oldPrice: 329.99,
    rating: 4.5,
    reviews: 156,
    discount: 25,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "6",
    name: "Wireless Turntable",
    price: 149.99,
    rating: 4.3,
    reviews: 73,
    image: "/placeholder.svg?height=300&width=300",
  },
];
