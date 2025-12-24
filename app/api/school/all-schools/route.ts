import { env } from "@/env";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";

    const res = await fetch(`${env.SERVER_URL}/api/organization/userOrganizations`, {
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieHeader,
      },
      credentials: "include",
    });

    const data = await res.json();
    
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Failed to fetch all schools" }, { status: 500 });
  }
}
