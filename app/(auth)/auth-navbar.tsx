import Image from "next/image";
import Link from "next/link";

const AuthNavbar = () => {
    return (
        <nav className="flex items-center justify-start p-5 ">
            <Link href="/" className="block w-[180px] h-[60px] relative">
                <Image
                    src="/hanoled_logo.jpg"
                    alt="Hanoled Logo"
                    fill
                    priority
                    className="object-contain"
                />
            </Link>
        </nav>
    );
};

export default AuthNavbar;
