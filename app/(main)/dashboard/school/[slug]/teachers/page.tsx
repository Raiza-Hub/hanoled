import SearchBar from "@/components/search-bar";
import TeacherLists from "@/components/teacher/teacher-lists";

const TeacherPage = async ({ params }: { params: Promise<{ slug: string }> }) => {

    const { slug } = await params;

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col px-6">
            <div className="flex items-center justify-between mb-4 py-4">
                <div className="space-y-0.5">
                    <h1 className="text-2xl font-bold">Teacher Management</h1>
                    <p className="text-zinc-600 text-[15px]">Manage your staff members and their account permissions here</p>
                </div>
            </div>

            <SearchBar />
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg font-semibold">All teachers</h2>

            </div>
                

            <TeacherLists slug={slug} />
        </div>
    );
}

export default TeacherPage;