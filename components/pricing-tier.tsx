import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Check, MoveRight, PhoneCall } from "lucide-react";

function PricingTier() {
    return (
        <div className="w-full py-20 lg:py-40">
            <div className="container mx-auto">
                <div className="flex text-center justify-center items-center gap-4 flex-col">
                    <div className="flex gap-2 flex-col">
                        <h1 className="text-4xl md:text-6xl tracking-tight max-w-3xl text-center font-bold">
                            Prices that make sense!
                        </h1>
                        <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
                            Managing a small business today is already tough.
                        </p>
                    </div>
                    <div className="grid pt-20 text-left grid-cols-1 lg:grid-cols-3 w-full gap-8">
                        <Card className="w-full rounded-md">
                            <CardHeader>
                                <CardTitle>
                                    <span className="flex flex-row gap-4 items-center font-extrabold">
                                        Startup
                                    </span>
                                </CardTitle>
                                {/* <CardDescription>
                                    Our goal is to streamline SMB trade, making it easier and faster
                                    than ever for everyone and everywhere.
                                </CardDescription> */}
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-8 justify-start">
                                    <div className="flex flex-row  items-center gap-2 text-xl">
                                        <span className="text-4xl font-bold">₦0</span>
                                        <sub className="text-sm text-muted-foreground">
                                            per student / term
                                        </sub>

                                    </div>
                                    <p>
                                        Our goal is to streamline SMB trade, making it easier and faster
                                        than ever for everyone and everywhere.
                                    </p>
                                    <Button variant="outline" className="gap-4">
                                        Sign up today
                                    </Button>
                                    <div className="flex flex-col gap-4 justify-start">
                                        <div className="flex flex-row gap-4">
                                            <Check className="w-4 h-4 mt-2 text-primary" />
                                            <div className="flex flex-col">
                                                <p>Fast and reliable</p>
                                                <p className="text-muted-foreground text-sm">
                                                    We&apos;ve made it fast and reliable.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-4">
                                            <Check className="w-4 h-4 mt-2 text-primary" />
                                            <div className="flex flex-col">
                                                <p>Fast and reliable</p>
                                                <p className="text-muted-foreground text-sm">
                                                    We&apos;ve made it fast and reliable.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-4">
                                            <Check className="w-4 h-4 mt-2 text-primary" />
                                            <div className="flex flex-col">
                                                <p>Fast and reliable</p>
                                                <p className="text-muted-foreground text-sm">
                                                    We&apos;ve made it fast and reliable.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <Button variant="outline" className="gap-4">
                                        Sign up today <MoveRight className="w-4 h-4" />
                                    </Button> */}
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="w-full shadow-2xl rounded-md">
                            <CardHeader>
                                <CardTitle>
                                    <span className="flex flex-row gap-4 items-center font-extrabold">
                                        Growth
                                    </span>
                                </CardTitle>
                                {/* <CardDescription>
                                    Our goal is to streamline SMB trade, making it easier and faster
                                    than ever for everyone and everywhere.
                                </CardDescription> */}
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-8 justify-start">
                                    <div className="flex flex-row  items-center gap-2 text-xl">
                                        <span className="text-4xl font-bold">₦2000</span>
                                        <sub className="text-sm text-muted-foreground">
                                            per student / term
                                        </sub>
                                    </div>
                                    <p>
                                        Our goal is to streamline SMB trade, making it easier and faster
                                        than ever for everyone and everywhere.
                                    </p>
                                    <Button className="gap-4">
                                        Get started
                                    </Button>
                                    <div className="flex flex-col gap-4 justify-start">
                                        <div className="flex flex-row gap-4">
                                            <Check className="w-4 h-4 mt-2 text-primary" />
                                            <div className="flex flex-col">
                                                <p>Fast and reliable</p>
                                                <p className="text-muted-foreground text-sm">
                                                    We&apos;ve made it fast and reliable.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-4">
                                            <Check className="w-4 h-4 mt-2 text-primary" />
                                            <div className="flex flex-col">
                                                <p>Fast and reliable</p>
                                                <p className="text-muted-foreground text-sm">
                                                    We&apos;ve made it fast and reliable.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-4">
                                            <Check className="w-4 h-4 mt-2 text-primary" />
                                            <div className="flex flex-col">
                                                <p>Fast and reliable</p>
                                                <p className="text-muted-foreground text-sm">
                                                    We&apos;ve made it fast and reliable.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="w-full rounded-md">
                            <CardHeader>
                                <CardTitle>
                                    <span className="flex flex-row gap-4 items-center font-extrabold">
                                        Enterprise
                                    </span>
                                </CardTitle>
                                {/* <CardDescription>
                                    Our goal is to streamline SMB trade, making it easier and faster
                                    than ever for everyone and everywhere.
                                </CardDescription> */}
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-8 justify-start">
                                    <div className="flex flex-row  items-center gap-2 text-xl">
                                        <span className="text-4xl font-bold">Contact us</span>
                                        <sub className="text-sm text-muted-foreground">Custom pricng</sub>
                                    </div>
                                    <p>
                                        Our goal is to streamline SMB trade, making it easier and faster
                                        than ever for everyone and everywhere.
                                    </p>
                                    <Button variant="outline" className="gap-4">
                                        Contact sales
                                    </Button>
                                    <div className="flex flex-col gap-4 justify-start">
                                        <div className="flex flex-row gap-4">
                                            <Check className="w-4 h-4 mt-2 text-primary" />
                                            <div className="flex flex-col">
                                                <p>Fast and reliable</p>
                                                <p className="text-muted-foreground text-sm">
                                                    We&apos;ve made it fast and reliable.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-4">
                                            <Check className="w-4 h-4 mt-2 text-primary" />
                                            <div className="flex flex-col">
                                                <p>Fast and reliable</p>
                                                <p className="text-muted-foreground text-sm">
                                                    We&apos;ve made it fast and reliable.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-4">
                                            <Check className="w-4 h-4 mt-2 text-primary" />
                                            <div className="flex flex-col">
                                                <p>Fast and reliable</p>
                                                <p className="text-muted-foreground text-sm">
                                                    We&apos;ve made it fast and reliable.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { PricingTier };
