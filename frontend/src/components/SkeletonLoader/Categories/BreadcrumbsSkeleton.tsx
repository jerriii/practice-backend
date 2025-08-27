export default function BreadcrumbsSkeleton() {
    return (
        <div className="flex mb-6">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex items-center mx-2">
                <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
    );
}