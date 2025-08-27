// components/Breadcrumb.js
import Link from "next/link";

const Breadcrumb = () => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
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
            <span className="text-sm font-medium">Products</span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
