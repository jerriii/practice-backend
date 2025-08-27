const CategoryBenefits = () => {
    return (
        <div className="mt-20 mb-12 bg-muted rounded-lg p-8">
            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold mb-4">Why Shop by Category?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Discover the benefits of our categorized shopping experience
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-background rounded-lg p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary"
                        >
                            <path d="m21 7-9-5-9 5 9 5 9-5Z"></path>
                            <path d="M3 12v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M3 7v7"></path>
                            <path d="M21 7v7"></path>
                        </svg>
                    </div>
                    <h3 className="font-medium text-lg mb-2">Organized Shopping</h3>
                    <p className="text-muted-foreground">
                        Find exactly what you&apos;re looking for with our neatly
                        organized product categories.
                    </p>
                </div>
                <div className="bg-background rounded-lg p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary"
                        >
                            <path d="M12 20V10"></path>
                            <path d="m18 14-6-6-6 6"></path>
                            <path d="M8 4h8"></path>
                        </svg>
                    </div>
                    <h3 className="font-medium text-lg mb-2">Discover New Products</h3>
                    <p className="text-muted-foreground">
                        Explore related items and discover new products within your
                        favorite categories.
                    </p>
                </div>
                <div className="bg-background rounded-lg p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary"
                        >
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                            <path d="m9 12 2 2 4-4"></path>
                        </svg>
                    </div>
                    <h3 className="font-medium text-lg mb-2">Quality Assurance</h3>
                    <p className="text-muted-foreground">
                        Each category features carefully selected products that meet our
                        quality standards.
                    </p>
                </div>
            </div>
        </div>
    )
}
export default CategoryBenefits