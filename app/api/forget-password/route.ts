import { env } from "@/env";
import { ForgotPassword } from "@/type";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const cookieHeader = req.headers.get("cookie") || "";
      
    const res = await fetch(`${env.SERVER_URL}/api/auth/forgotPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieHeader,
        },
      credentials: "include",
      body: JSON.stringify({ email })
    });

    const data: ForgotPassword = await res.json();
      
    console.log(data);
      

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Proxy error:", err);
   const data: ForgotPassword = {
      message: err instanceof Error ? err.message : "something went wrong."
    };
    return NextResponse.json(data, { status: 500 });
  }
}
