import { env } from "@/env";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    const cookie = req.headers.get("cookie") || "";
      
    const match = cookie.match(/better-auth\.session_token=[^;]+/);
    const sessionToken = match ? match[0] : "";


    const res = await fetch(`${env.SERVER_URL}/api/organization/userOrganization/${slug}`, {
      headers: {
        "Content-Type": "application/json",
        cookie: sessionToken,
      },
      credentials: "include",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch school" }, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
