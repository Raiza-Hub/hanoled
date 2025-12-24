"use client"

import { IconBrandWhatsapp, IconMail } from "@tabler/icons-react";



const ContactSocial = () => {
    return (
        <div className="w-full flex flex-col gap-4 max-w-xl mt-10">
            <div>
                <button
                    onClick={() => window.open("https://wa.me/2349063611541", "_blank")}
                    className="inline-flex items-center w-full border p-4 rounded-md  transition cursor-pointer hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
                >
                    <span className="font-medium text-lg ">Chat with team</span>
                    <IconBrandWhatsapp className="w-6 h-6 ml-auto text-green-400" />
                </button>
            </div>
            <div>
                <button
                    onClick={() => (window.location.href = "mailto:wisdomadebola62@gmail.com")}
                    className="inline-flex items-center w-full border p-4 rounded-md transition cursor-pointer hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
                >
                    <span className="font-medium text-lg">Send us an email</span>
                    <IconMail className="w-6 h-6 ml-auto" />
                </button>
            </div>
        </div>
    );
}

export default ContactSocial;