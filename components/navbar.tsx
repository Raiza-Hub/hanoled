import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "./ui/button";


const Navbar = () => {
    return (
        <nav className="w-full inset-x-0 h-16">
            <div className="px-6">
                <div className="flex h-16 items-center">
                    {/* <MobileNav /> */}

                    <div className="ml-4 flex lg:ml-0 bg-red-50">
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

                    <div className="lg:ml-8 lg:flex lg:self-stretch">
                        {/* <NavItems /> */}
                        <div className="relative flex items-center justify-center">
                            <Link
                                href='/pricing'
                                className={buttonVariants({
                                    variant: 'ghost',
                                })}
                            >
                                Pricing
                            </Link>
                            <Link
                                href='/contact'
                                className={buttonVariants({
                                    variant: 'ghost',
                                })}
                            >
                                Contact us
                            </Link>
                        </div>
                    </div>

                    <div className="ml-auto flex items-center">
                        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                            <Link
                                href='/sign-in'
                                className={buttonVariants({
                                    variant: 'ghost',
                                })}>
                                Sign in
                            </Link>
                            <Link
                                href='/sign-up'
                                className={buttonVariants()}>
                                Get started
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;