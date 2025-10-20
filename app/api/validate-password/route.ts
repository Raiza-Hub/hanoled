import { env } from "@/env";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";

    const match = cookie.match(/better-auth\.session_token=[^;]+/);
    const sessionToken = match ? match[0] : "";

    const { password } = await req.json();

    if (!password) {
      return NextResponse.json({ error: "Password required" }, { status: 400 });
    }

    // ✅ Add "method: POST"
    const res = await fetch(`${env.SERVER_URL}/api/auth/my-plugin/validate-current-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: sessionToken,
      },
      credentials: "include",
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Failed to validate password" }, { status: 500 });
  }
}
