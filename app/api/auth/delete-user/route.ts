
import { env } from "@/env";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const cookieHeader = req.headers.get("cookie") || "";
        
        const res = await fetch(`${env.SERVER_URL}/api/auth/userDelete`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Cookie": cookieHeader,
            },
        credentials: "include",
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
