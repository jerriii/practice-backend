import Link from "next/link"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { Category } from "@/types/categories"

const CategoryCollections = ({categoryCollections}: {categoryCollections: Category[]}) => {
    return (
        <div className="mt-20 space-y-16">
        {categoryCollections.map((collection) => (
          <div key={collection.id} className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{collection.name}</h2>
              <Link href={`/categories/${collection.slug}`}>
                <Button variant="ghost" className="group">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {collection?.subcategories?.map((subcategory) => (
                <Link
                  key={subcategory.id}
                  href={`/categories/${collection.slug}/${subcategory.slug}`}
                  className="group overflow-hidden rounded-lg border bg-background transition-colors hover:bg-muted/50"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={subcategory.image || "/placeholder.svg"}
                      alt={subcategory.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium group-hover:text-primary">
                      {subcategory.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {subcategory.productCount} Products
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
}

export default CategoryCollections