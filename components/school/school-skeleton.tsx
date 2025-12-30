const SchoolsSkeleton = () => {
    return (
        <div role="status" aria-live="polite" aria-busy="true">
            <span className="sr-only">Loading schools…</span>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(2)].map((_, i) => (
                    <div
                        key={i}
                        className="h-40 rounded-md p-4 animate-pulse border border-border bg-accent"
                    >
                        <div className="space-y-2 ">
                            <div className="h-4 bg-gray-200 animate-pulse w-2/6"></div>
                            <div className="h-4 bg-gray-200 animate-pulse w-2/4"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SchoolsSkeleton;
