import { Category } from "@/types/categories"
import Image from "next/image"
import Link from "next/link"

const SubCategory = ({ category }: { category?: Category }) => {
    return (
        <>
            {category?.subcategories && category.subcategories.length > 0 && (
                <div className="mb-10">
                    <h2 className="text-xl font-semibold mb-4">
                        Browse {category?.name} Subcategories
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {category?.subcategories.map((subcategory) => (
                            <Link
                                key={subcategory.id}
                                href={`/categories/${category?.slug}/${subcategory.slug}`}
                                className="group flex flex-col items-center text-center"
                            >
                                <div className="relative w-20 h-20 mb-2 rounded-full overflow-hidden bg-muted">
                                    <Image
                                        src={subcategory.icon || "/placeholder.svg"}
                                        alt={subcategory.name}
                                        fill
                                        className="object-cover p-4 transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                                    {subcategory.name}
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    {subcategory.productCount} Products
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default SubCategory
