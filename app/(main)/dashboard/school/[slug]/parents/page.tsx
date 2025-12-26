

import CreateParentDialog from "@/components/parent/parent-dialog";
import ParentList from "@/components/parent/parent-lists";

const ParentPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col px-6">
            <div className="flex items-center justify-between mb-4 py-4">
                <div>
                    <h1 className="text-2xl font-semibold">Parent Management</h1>
                    <p className="text-zinc-600 text-[15px]">Manage your staff members and their account permissions here</p>
                </div>
            </div>

            <CreateParentDialog slug={slug} />

            <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg font-medium">All parents</h2>
            </div>

            <div className="flex flex-col justify-center">
                <ParentList slug={slug} />
            </div>
        </div>
    );
}

export default ParentPage;