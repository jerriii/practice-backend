export function FeaturedCategoriesSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[...Array(3)].map((_, index) => (
                <div
                    key={index}
                    className="group relative overflow-hidden rounded-lg aspect-[4/3] bg-gray-100 animate-pulse"
                >
                    {/* Gradient overlay matching your design */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6">
                        {/* Category name placeholder */}
                        <div className="h-7 w-3/4 mb-3 bg-gray-300/30 rounded"></div>

                        {/* Product count placeholder */}
                        <div className="h-5 w-1/2 mb-4 bg-gray-300/30 rounded"></div>

                        {/* Button placeholder */}
                        <div className="h-10 w-32 bg-gray-300/30 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}