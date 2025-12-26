"use client";

const ClassListLoading = () => {
    const skeletons = Array.from({ length: 3 });

    return (
        <div className="space-y-4">
            {skeletons.map((_, i) => (
                <div
                    key={i}
                    className="w-full rounded-sm border bg-white p-4 flex items-center justify-between hover:bg-zinc-50 animate-pulse"
                >
                    <div className="flex flex-col w-full">
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-1.5">
                            <div className="h-4 w-28 bg-muted rounded" />
                            <div className="h-4 w-16 bg-muted rounded-sm" />
                        </div>

                        {/* Class limit */}
                        <div className="text-zinc-600 text-sm mb-1.5">
                            <div className="flex gap-2 items-center">
                                <div className="h-3 w-24 bg-muted rounded" />
                                <div className="h-3 w-10 bg-muted rounded" />
                            </div>
                        </div>

                        {/* Spreadsheet info */}
                        <div className="flex items-center gap-2 text-sm text-zinc-500">
                            <div className="h-4 w-4 bg-muted rounded" />
                            <div className="h-3 w-24 bg-muted rounded" />
                        </div>
                    </div>

                    {/* Action menu placeholder */}
                    <div className="h-6 w-6 bg-muted rounded" />
                </div>
            ))}
        </div>
    );
};

export default ClassListLoading;
