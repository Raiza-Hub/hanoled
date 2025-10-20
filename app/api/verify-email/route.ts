import { env } from "@/env";
import { OtpResponse } from "@/type";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { otp } = await req.json();
    
    const cookieHeader = req.headers.get("cookie") || "";
      
    const res = await fetch(`${env.SERVER_URL}/api/auth/verifyUser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieHeader,
        },
      credentials: "include",
      body: JSON.stringify({ otp }),
    });

    const data: OtpResponse = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Proxy error:", err);
   const data: OtpResponse = {
      success: false,
      message: err instanceof Error ? err.message : "something went wrong."
    };
    return NextResponse.json(data, { status: 500 });
  }
}
