import DeleteSchool from "@/components/setting/school/delete-school";
import MemberLists from "@/components/setting/school/member-lists";
import SchoolSettings from "@/components/setting/school/school-settings";
import { Delete } from "lucide-react";


const SchoolsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    return (
        <div className="w-full max-w-3xl mx-auto flex flex-col p-6">
            <div className="flex flex-col border-b pb-6 mb-6">
                <h2 className="font-semibold">School Settings</h2>
                <p className="text-sm">
                    Manage and customize your school&apos;s settings, preferences, and profile information.
                </p>
            </div>
            <div className="">
                <SchoolSettings slug={slug} />
            </div>

            {/* <div className="mt-6">
                <div className="flex flex-col border-b pb-6 mb-6">
                    <h2 className="font-semibold">Member List</h2>
                    <p className="text-sm">
                        View and manage all members associated with your school, including their roles.
                    </p>
                </div>

                <MemberLists slug={slug} />
            </div> */}

            <div className="my-16">
                <div className="flex flex-col mb-6">
                    <h2 className="font-semibold text-red-500">Danger zone</h2>
                    <p className="text-sm">
                        Deleting your account is a permanent action and cannot be undone. All your school data, members, and associated information will be permanently removed. Please proceed with caution.
                    </p>
                </div>

                <DeleteSchool slug={slug} />
            </div>
        </div>
    );
}

export default SchoolsPage;