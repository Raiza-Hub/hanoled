const SchoolsSkeleton = () => {
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <div className="h-8 bg-accent animate-pulse w-[320px] rounded-md" />
                <div className="h-8 bg-accent animate-pulse w-[150px] rounded-md" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(2)].map((_, i) => (
                    <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: using index as key for static array
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
