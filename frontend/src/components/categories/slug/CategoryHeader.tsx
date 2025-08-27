import { Category } from "@/types/categories";
import Image from "next/image"

const CategoryHeader = ({category}: {category?: Category}) => {
    const categoryData = category || {
        id: 0,
        name: "Category Not Found",
        slug: "",
        description: "This category does not exist.",
        image: "/placeholder.svg",
        productCount: 0,
        subcategories: [],
    };
    return (<div className="relative h-[200px] md:h-[300px] rounded-lg overflow-hidden mb-8">
        <Image
            src={categoryData.image || "/placeholder.svg"}
            alt= "Category Image"
            fill
            className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="p-6 md:p-10 max-w-xl">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {categoryData.name}
                </h1>
                <p className="text-white/80 mb-4">{categoryData.description}</p>
                <div className="text-white/80 text-sm">
                    {categoryData.productCount} Products
                </div>
            </div>
        </div>
    </div>)
}

export default CategoryHeader;