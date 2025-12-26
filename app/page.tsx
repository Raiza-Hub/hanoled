import BentoGrid from "@/components/bento-grid";
import { FeaturesSection } from "@/components/feature-section";
import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { IconBrandWhatsapp, IconMail } from "@tabler/icons-react";
import { Github, Hexagon, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="py-24 max-w-7xl mx-auto px-3 md:px-20">
        <header className="w-full pb-16">
          <div className="mx-auto text-center flex flex-col items-center max-w-4xl gap-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl">
              Your marketplace for high-quality{" "}
              <span className="text-blue-600">digital assets</span>.
            </h1>
            <p className="text-lg max-w-prose text-muted-foreground">
              Welcome to DigitalHippo. Every asset on our platform is verified by
              our team to ensure our highest quality standards.
            </p>
            <div className="w-full sm:w-fit p-2 flex flex-col sm:flex-row gap-4 mt-2 ">
              <Link href="/" className={buttonVariants()}>
                Get started
              </Link>
              <Button variant="outline">Request a demo &rarr;</Button>
            </div>
          </div>
        </header>

        <div className="flex relative border shadow-2xl rounded-lg">
          <Image
            src="/example.webp"
            alt=""
            height={1000}
            width={1000}
            priority
            className="aspect-[16/9] h-auto w-full object-cover"
          />
        </div>
      </div>

      <div className="bg-zinc-50">
        <div className="py-24 max-w-7xl mx-auto px-2.5 md:px-20">
          <div className="mx-auto text-center flex flex-col items-center">
            <div className="mx-auto text-center flex flex-col items-center max-w-3xl gap-2">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 lg:text-5xl">With us, appointment scheduling is easy</h2>
              <p className="max-w-prose text-muted-foreground">Effortless scheduling for business and individuals, powerful solutions for fast-growing modern companies.</p>
            </div>

            <div className="mt-10">
              <BentoGrid />
            </div>
          </div>
        </div>
      </div>


      <div className="py-24 max-w-7xl mx-auto px-2.5 md:px-20">
        <div className="mx-auto text-center flex flex-col items-center max-w-3xl gap-2">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 lg:text-5xl">With us, appointment scheduling is easy</h2>
          <p className="max-w-prose text-muted-foreground">Effortless scheduling for business and individuals, powerful solutions for fast-growing modern companies.</p>
        </div>

        <FeaturesSection />
      </div>

      <div className="bg-zinc-50">
        <div className="py-10 max-w-7xl mx-auto px-2.5 md:px-20">
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
      </div>

    </>
  );
}
