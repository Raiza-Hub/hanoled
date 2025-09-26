import SearchableSchools from "@/components/school/searchable-schools";


export default async function DashboardPage() {
    return (
        <div className="w-full bg-background p-6 mt-10">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-2xl font-semibold mb-12">Schools</h1>

                <div>
                    <SearchableSchools />
                </div>
            </div>
        </div>
    );
}
