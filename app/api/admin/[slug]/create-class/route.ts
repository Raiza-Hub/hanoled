import { env } from "@/env";
import { ApiErrorResponse, CreateSubjectResponse } from "@/type";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
    const { slug } = await params;
    const {  className, level, memberId, limit  } = await req.json();

    const cookieHeader = req.headers.get("cookie") || "";
      
    const res = await fetch(`${env.SERVER_URL}/api/admin/get/unassignedMember/${slug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieHeader,
        },
      credentials: "include",
      body: JSON.stringify({ className, level, memberId, limit  })
    });

    const data = await res.json();
            
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
