import { env } from "@/env";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {

    const cookieHeader = req.headers.get("cookie") || "";


    const res = await fetch(`${env.SERVER_URL}/api/organization/getOrganization`, {
      headers: {
        "Content-Type": "application/json",
        "cookie": cookieHeader,
      },
      credentials: "include",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch school" }, { status: res.status });
    }

      const data = await res.json();
      
      console.log(data);
      

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
