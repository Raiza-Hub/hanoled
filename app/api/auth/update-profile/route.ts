import { env } from "@/env";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    try {
        const { name, email} = await req.json();
        const cookieHeader = req.headers.get("cookie") || "";
        
        const res = await fetch(`${env.SERVER_URL}/api/auth/updateUser`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Cookie": cookieHeader,
            },
        credentials: "include",
        body: JSON.stringify({ name, email }),
        });

        const data = await res.json();
        
        console.log(data);
        

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Proxy error:", err);
   const data = {
      success: false,
      message: err instanceof Error ? err.message : "something went wrong."
    };
    return NextResponse.json(data, { status: 500 });
  }
}
