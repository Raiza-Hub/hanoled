import StudentLists from "@/components/student/student-list";


const StudentPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    return ( 
        <div className="w-full max-w-7xl mx-auto flex flex-col px-6">
            <div className="flex items-center justify-between mb-4 py-4">
                <div className="space-y-0.5">
                    <h1 className="text-2xl font-semibold">Student Management</h1>
                    <p className="text-zinc-600 text-[15px]">  Here you can view, select, and manage all subjects associated with your school.</p>
                </div>
            </div>

            {/* <CreateSubjectDialog slug={slug} /> */}

            <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg font-semibold">All subjects</h2>
            </div>

            <div className="flex flex-col justify-center">
                <StudentLists slug={slug} />
            </div>
        </div>
     );
}
 
export default StudentPage;