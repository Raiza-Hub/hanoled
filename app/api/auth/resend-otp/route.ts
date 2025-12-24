import { env } from "@/env";
import { GetNewOtpError, GetNewOtpSuccess } from "@/type";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
      
    const res = await fetch(`${env.SERVER_URL}/api/auth/getNewOtp`, {
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieHeader,
        },
      credentials: "include",
    });

    const data: GetNewOtpSuccess = await res.json();
      
    console.log(data);
      

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Proxy error:", err);
   const data: GetNewOtpError = {
      success: false,
      message: err instanceof Error ? err.message : "something went wrong."
    };
    return NextResponse.json(data, { status: 500 });
  }
}
