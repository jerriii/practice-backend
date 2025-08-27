import { Category } from "@/types/categories"
import Image from "next/image"
import Link from "next/link"

const AllCategories = ({ allCategories }: { allCategories: Category[] }) => {
    return (
    <>
        <h2 className="text-2xl font-bold mb-8">All Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8">
            {allCategories.map((category) => (
                <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="group flex flex-col items-center text-center"
                >
                    <div className="relative w-24 h-24 mb-3 rounded-full overflow-hidden bg-muted">
                        <Image
                            src={category.icon || "/placeholder.svg"}
                            alt={category.name}
                            fill
                            className="object-cover p-5 transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>
                    <h3 className="font-medium group-hover:text-primary transition-colors">
                        {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        {category.productCount} Products
                    </p>
                </Link>
            ))}
        </div>
    </>
    )
}

export default AllCategories
