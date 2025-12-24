import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IconArrowUpRight, IconExclamationCircle } from "@tabler/icons-react";



const ManageWhatsapp = () => {
    return ( 
        <Dialog>
            <DialogTrigger asChild className="text-sm -mt-1">
                <Button variant="link" size="sm" className="text-blue-500 !px-0 cursor-pointer">
                    Link WhatsApp number
                    <IconArrowUpRight />
                </Button>
            </DialogTrigger>
            <DialogContent className="!max-w-md space-y-1">
                <div className="flex flex-col items-center gap-2">
                    <div
                        className="flex size-9 shrink-0 items-center justify-center"
                        aria-hidden="true"
                    >
                        <IconExclamationCircle className="text-red-500 opacity-80 size-20" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="sm:text-center">
                            Delete your entire account permanently?
                        </DialogTitle>
                        <DialogDescription className="sm:text-center">
                            This action cannot be undone. Your entire account will be permanently deleted and you will be removed from all invited schools. Additionally, the following workspace you own will be permanently deleted, removing any other members, parents and their access.
                        </DialogDescription>
                    </DialogHeader>
                </div>

            </DialogContent>
        </Dialog>
     );
}
 
export default ManageWhatsapp;