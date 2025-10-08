export function NoResultsFound({ searchQuery }: { searchQuery: string }) {
    return (
        <div className="flex flex-col justify-center py-4 px-10 border rounded-md bg-accent">
            <h2 className="font-medium text-foreground mb-2">No results found</h2>
            <p className="text-sm text-muted-foreground">
                {searchQuery
                    ? `Your search for "${searchQuery}" did not return any schools`
                    : "No schools match your current filters"}
            </p>
        </div>
    );
}