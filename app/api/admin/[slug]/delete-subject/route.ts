import { env } from "@/env";
import { ApiErrorResponse } from "@/type";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
    const { slug } = await params;
    const {  subjects } = await req.json();
        
        console.log(subjects);
        
        
    const cookieHeader = req.headers.get("cookie") || "";
      
    const res = await fetch(`${env.SERVER_URL}/api/admin/subject/delete/${slug}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieHeader,
        },
      credentials: "include",
      body: JSON.stringify({ subjectName: subjects })
    });

    const data = await res.json();
        
    console.log(data);
        
            
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Proxy error:", err);
    const data: ApiErrorResponse = {
      success: false,
      message: err instanceof Error ? err.message : "something went wrong."
    };
    return NextResponse.json(data, { status: 500 });
  }
}
