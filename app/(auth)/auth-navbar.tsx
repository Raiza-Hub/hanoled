import Image from "next/image";
import Link from "next/link";

const AuthNavbar = () => {
    return (
        <nav className="flex items-center justify-start p-5 ">
            <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                    <Image
                        src="/hanoled_logo.jpg"
                        alt="Hanoled Logo"
                        width={180}
                        height={180}
                        priority
                        loading="eager"
                    />
                </Link>
            </div>
        </nav>
    );
};

export default AuthNavbar;
