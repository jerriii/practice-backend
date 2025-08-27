import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import { Category } from "@/types/categories"

const FeaturedCategories = ({ featuredCategories }: { featuredCategories?: Category[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {featuredCategories?.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="group relative overflow-hidden rounded-lg aspect-[4/3]"
        >
          <Image
            src={category.image || "/placeholder.svg"}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6">
            <h2 className="text-white text-2xl font-bold mb-2">
              {category.name}
            </h2>
            <p className="text-white/80 mb-4">
              {category.productCount} Products
            </p>
            <Button
              variant="outline"
              className="w-fit bg-white/20 text-white border-white/40 backdrop-blur-sm hover:bg-white/30 hover:text-white group-hover:translate-x-2 transition-transform"
            >
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default FeaturedCategories
