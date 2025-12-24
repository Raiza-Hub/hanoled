import { Button } from "@/components/ui/button";
import { Check, Minus } from "lucide-react";

function PricingComparsing() {
    return (
        <div className="w-full py-20">
            <div className="container mx-auto">
                <div className="flex text-center justify-center items-center gap-4 flex-col">
                    <div className="flex gap-2 flex-col">
                        <h1 className="text-4xl max-w-3xl text-center font-bold">
                            Plans and features
                        </h1>
                        {/* <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
                            Managing a small business today is already tough.
                        </p> */}
                    </div>
                    <div className="grid text-left w-full grid-cols-3 lg:grid-cols-4 divide-x pt-20">
                        <div className="col-span-3 lg:col-span-1"></div>
                        <div className="px-3 py-1 md:px-6 md:py-4 gap-2 flex flex-col sticky top-0 bg-white z-20 shadow-sm">
                            <p className="text-2xl">Startup</p>
                            <p className="flex flex-col lg:flex-row lg:items-center gap-2 text-zl mt-2">
                                <span className="text-xl font-bold">₦0</span>
                                <sub className="text-sm text-muted-foreground">per student / term</sub>
                            </p>
                            <Button variant="outline" className="gap-4 mt-2">
                                Sign up today 
                            </Button>
                        </div>

                        {/* GROWTH HEADER (STICKY) */}
                        <div className="px-3 py-1 md:px-6 md:py-4 gap-2 flex flex-col sticky top-0 bg-white z-20 shadow-sm">
                            <p className="text-2xl">Growth</p>
                            <p className="flex flex-col lg:flex-row lg:items-center gap-2 text-zl mt-2">
                                <span className="text-xl font-bold">₦2000</span>
                                <sub className="text-sm text-muted-foreground">per student / term</sub>
                            </p>
                            <Button className="gap-4 mt-2">
                                Get started
                            </Button>
                        </div>

                        {/* ENTERPRISE HEADER (STICKY) */}
                        <div className="px-3 py-1 md:px-6 md:py-4 gap-2 flex flex-col sticky top-0 bg-white z-20 shadow-sm">
                            <p className="text-2xl">Enterprise</p>
                            <p className="flex flex-col lg:flex-row lg:items-center gap-2 text-xl mt-2">
                                <span className="text-xl font-bold">Contact sales</span>
                                <sub className="text-sm text-muted-foreground">Custom pricing</sub>
                            </p>
                            <Button variant="outline" className="gap-4 mt-2">
                                Contact us
                            </Button>
                        </div>
                        <div className="px-3 lg:px-6 col-span-3 lg:col-span-1  py-4">
                            <b>Features</b>
                        </div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 border-b border-zinc-200">SSO</div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center  border-b border-zinc-200">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 border-b border-zinc-200 ">
                            AI Assistant
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200 ">
                            <Minus className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200 ">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200 ">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 border-b border-zinc-200 ">
                            Version Control
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200 ">
                            <Minus className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200 ">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200 ">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 border-b border-zinc-200 ">
                            Members
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <p className="text-muted-foreground text-sm">5 members</p>
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <p className="text-muted-foreground text-sm">25 members</p>
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <p className="text-muted-foreground text-sm">100+ members</p>
                        </div>
                        <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 border-b border-zinc-200">
                            Multiplayer Mode
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Minus className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 border-b border-zinc-200">
                            Orchestration
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Minus className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 border-b border-zinc-200">
                            Orchestration
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Minus className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 border-b border-zinc-200">
                            Orchestration
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Minus className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 border-b border-zinc-200">
                            Orchestration
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Minus className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 border-b border-zinc-200">
                            Orchestration
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Minus className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 border-b border-zinc-200">
                            Orchestration
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Minus className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 border-b border-zinc-200">
                            Orchestration
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Minus className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 border-b border-zinc-200">
                            Orchestration
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Minus className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 border-b border-zinc-200">
                            Orchestration
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Minus className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                        <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center border-b border-zinc-200">
                            <Check className="w-4 h-4 text-primary" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { PricingComparsing };
