import Image from "next/image";
import Link from "next/link";

const AuthNavbar = () => {
    return (
        <nav className="flex items-center justify-start p-5 ">
            <div className="ml-4 flex lg:ml-0">
                <Link href="/" className="block w-[180px] relative">
                    <Image
                        src="/hanoled_logo.jpg"
                        alt="Hanoled Logo"
                        priority
                        width={180}
                        height={180}
                        className="object-contain"
                    />
                </Link>
            </div>
        </nav>
    );
};

export default AuthNavbar;
