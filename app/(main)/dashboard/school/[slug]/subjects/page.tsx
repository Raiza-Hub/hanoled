import SubjectPageClient from "@/components/subject/subject-page-client";

export const metadata = {
    title: "Subject Management",
    description: "View, select, and manage all subjects associated with your school.",
};

const SubjectPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col px-6">
            <div className="flex items-center justify-between mb-4 py-4">
                <div className="space-y-0.5">
                    <h1 className="text-2xl font-semibold">Subject Management</h1>
                    <p className="text-zinc-600 text-[15px]">Here you can view, select, and manage all subjects associated with your school.</p>
                </div>
            </div>

            <SubjectPageClient slug={slug} />
        </div>
    );
}

export default SubjectPage;