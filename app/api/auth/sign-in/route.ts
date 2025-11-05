import { env } from "@/env";
import { SignInResponse } from "@/type";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const { email, password } = await req.json();
      const res = await fetch(`${env.SERVER_URL}/api/auth/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data: SignInResponse = await res.json(); 
      
    const response = NextResponse.json(data, { status: res.status });

    const cookies = res.headers.get("set-cookie");
    if (cookies) response.headers.set("set-cookie", cookies);

    return response
  } catch (err) {
    console.error("Proxy error:", err);
    const data: SignInResponse = {
      success: false,
      message: err instanceof Error ? err.message : "something went wrong."
    };
    return NextResponse.json(data, { status: 500 });
  }
}
