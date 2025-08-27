export default function SortAndFilterSkeleton() {
    return (
        <div className="bg-muted mb-6 p-4 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1">
                <div className="absolute left-2.5 top-2.5 h-4 w-4 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse pl-8"></div>
              </div>
              <div className="h-10 w-[180px] bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
    );
}