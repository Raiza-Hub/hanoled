import Image from "next/image";
import Link from "next/link";

const AuthNavbar = () => {
    return (
        <nav className="flex items-center justify-start p-2">
            <div className="ml-4 flex lg:ml-0">
                <Link href="/" className="block w-[180px] relative aspect-[464/94]">
                    <Image
                        src="/hanoled_logo.jpg"
                        alt="Hanoled Logo"
                        width={464}
                        height={94}
                        priority
                        sizes="180px"
                        className="object-contain"
                    />
                </Link>
            </div>
        </nav>
    );
};

export default AuthNavbar;
