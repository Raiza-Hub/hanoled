import Sidebar, { SidebarItem } from "@/components/sidebar";
import { env } from "@/env";
import {
    Blocks,
    FileClock,
    FolderTree,
    HelpCircle,
    LayoutDashboard,
    Settings,
    UserCog,
    UserPen,
    Users,
} from "lucide-react";
import { cookies } from "next/headers";
import { ReactNode } from "react";
// server-side function

interface LayoutProps {
    children: ReactNode;
    params: Promise<{ slug: string }>;
}


const getSchool = async (slug: string) => {
    try {
        const cookieStore = await cookies();
        const rawCookie = cookieStore.toString();

        // ✅ Extract Better Auth session token
        const match = rawCookie.match(/better-auth\.session_token=[^;]+/);
        const sessionToken = match ? match[0] : "";

        const res = await fetch(
            `${env.SERVER_URL}/api/organization/userOrganization/${slug}?`,
            {
                headers: {
                    "Content-Type": "application/json",
                    cookie: sessionToken,
                },
                credentials: "include",
                cache: "no-store", // ensures fresh data each time
            }
        );

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Backend error:", res.status, errorText);
            throw new Error(`Failed to fetch school: ${res.statusText}`);
        }

        // ✅ Return the parsed JSON data
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching school:", error);
        throw new Error("Internal server error while fetching school");
    }
}


const Layout = async ({ children, params }: LayoutProps) => {
    const { slug } = await params;

    // ✅ Fetch the school data on the server
    // const school = await getSchool(slug); // This must run server-side
    // const role = school?.roles;

    const role = "owner"; // Temporary hardcoded role for testing

    console.log("User role:", role);
    

    // ✅ Role-based sidebar items
    const sidebarItems = [
        {
            text: "Dashboard",
            icon: <LayoutDashboard className="h-4 w-4" />,
            url: `/dashboard/school/${slug}`,
            allowed: ["owner", "admin", "teacher", "student", "parent"],
        },
        {
            text: "Teachers",
            icon: <UserCog className="h-4 w-4" />,
            url: `/dashboard/school/${slug}/teachers`,
            allowed: ["owner", "admin"],
        },
        {
            text: "Students",
            icon: <UserPen className="h-4 w-4" />,
            url: `/dashboard/school/${slug}/students`,
            allowed: ["owner", "admin", "teacher"],
        },
        {
            text: "Parents",
            icon: <Users className="h-4 w-4" />,
            url: `/dashboard/school/${slug}/parents`,
            allowed: ["owner", "admin"],
        },
        {
            text: "Reports",
            icon: <FileClock className="h-4 w-4" />,
            url: `/dashboard/school/${slug}/report`,
            allowed: ["owner", "admin", "teacher"],
        },
        {
            text: "Subjects",
            icon: <FolderTree className="h-4 w-4" />,
            url: `/dashboard/school/${slug}/subjects`,
            allowed: ["owner", "admin", "teacher"],
        },
        {
            text: "Classes",
            icon: <Blocks className="h-4 w-4" />,
            url: `/dashboard/school/${slug}/classes`,
            allowed: ["owner", "admin", "teacher"],
        },
        {
            text: "Settings",
            icon: <Settings className="h-4 w-4" />,
            url: `/dashboard/school/${slug}/settings`,
            allowed: ["owner", "admin"],
        },
        {
            text: "Get Help",
            icon: <HelpCircle className="h-4 w-4" />,
            url: `/dashboard/school/${slug}/help`,
            allowed: ["owner", "admin", "teacher", "student", "parent"],
        },
    ];

    return (
        <div className="flex h-full min-h-screen">
            <Sidebar className="w-60">
                {sidebarItems
                    .filter((item) => item.allowed.includes(role))
                    .map((item) => (
                        <SidebarItem
                            key={item.text}
                            icon={item.icon}
                            text={item.text}
                            url={item.url}
                        />
                    ))}
            </Sidebar>

            <main className="flex flex-1 flex-col gap-4 px-6 my-3">
                <div className="min-h-[100vh] flex-1 md:min-h-min">{children}</div>
            </main>
        </div>
    );
};

export default Layout;
