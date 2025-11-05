import { env } from "@/env";
import { SignUpError, SignUpSuccess } from "@/type";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const { name, email, password } = await req.json();
      
      const res = await fetch(`${env.SERVER_URL}/api/auth/signUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      const data: SignUpSuccess = await res.json();
      
      const response = NextResponse.json(data, { status: res.status });

      const cookies = res.headers.get("set-cookie");
      if (cookies) response.headers.set("set-cookie", cookies);
      
    return response
  } catch (err) {
    console.error("Proxy error:", err);
    const data: SignUpError = {
      success: false,
      message: err instanceof Error ? err.message : "something went wrong."
    };
  return NextResponse.json(data, { status: 500 });
  }
}
