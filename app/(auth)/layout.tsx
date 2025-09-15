import AuthNavbar from "./auth-navbar";




export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full min-h-screen flex flex-col ">
            <AuthNavbar />

            <div>{children}</div>
        </div>
    );
}
