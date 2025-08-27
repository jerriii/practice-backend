import Link from "next/link";
import CategoryBenefits from "@/components/categories/CategoryBenefits";
import CategoriesList from "./CategoriesList";

function CategoriesPage() {
  return (
    <div className="container mx-auto min-w-full lg:px-8 px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1">
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
              <span className="text-sm font-medium">Categories</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Shop by Category
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse our wide selection of products across different categories.
          Find exactly what you&apos;re looking for with our organized
          collections.
        </p>
      </div>

      {/* Featured Categories */}
      <CategoriesList />

      {/* All Categories */}
      {/* <AllCategories allCategories={allCategories} /> */}

      {/* Category Collections */}
      {/* <CategoryCollections categoryCollections={categoryCollections} /> */}

      {/* Category Benefits */}
      <CategoryBenefits />
    </div>
  );
}

export default CategoriesPage;