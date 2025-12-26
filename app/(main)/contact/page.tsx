import ContactSocial from "@/components/contact-social";
import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import { IconBrandWhatsapp, IconMail } from "@tabler/icons-react";

const ContactPage = () => {
    return (
        <>
            <Navbar />
            <div className="w-full py-20 lg:py-40 px-4">
                <div className="container mx-auto">
                    <div className="flex text-center justify-center items-center gap-4 flex-col">
                        <div className="flex gap-2 flex-col">
                            <h1 className="text-4xl md:text-6xl tracking-tight max-w-3xl text-center font-bold">
                                Contact Us
                            </h1>
                            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
                                We're happy to assist you with any questions about our technology, pricing plans, custom contract options, and migrations assistance.
                            </p>
                        </div>

                        <ContactSocial />
                    </div>
                </div>


                
            </div>

            <div className="py-10  max-w-7xl mx-auto">
                <Footer
                    socialLinks={[
                        {
                            icon: <IconMail className="h-5 w-5" />,
                            href: "https://twitter.com",
                            label: "Twitter",
                        },
                        {
                            icon: <IconBrandWhatsapp className="h-5 w-5" />,
                            href: "https://github.com",
                            label: "GitHub",
                        },
                    ]}
                    mainLinks={[

                        { href: "/about", label: "About us" },
                        { href: "/pricing", label: "Pricing" },
                        { href: "/contact", label: "Contact us" },
                    ]}
                    legalLinks={[
                        { href: "/privacy", label: "Privacy" },
                        { href: "/terms", label: "Terms" },
                    ]}
                />
            </div>
        </>
    );
}

export default ContactPage;