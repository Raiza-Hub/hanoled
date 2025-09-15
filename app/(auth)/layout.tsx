

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full min-h-screen flex flex-col">


            <div className="flex flex-col">{children}</div>
        </div>
    );
}
