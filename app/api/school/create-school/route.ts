import { env } from "@/env";
import { CreateSchoolError, CreateSchoolSuccess } from "@/type";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    
    // Get the FormData from the request
    const formData = await req.formData();
    
    // Forward the FormData directly to the Express backend
    const res = await fetch(`${env.SERVER_URL}/api/organization/create`, {
      method: "POST",
      headers: { 
        "Cookie": cookieHeader,
        // Don't set Content-Type - let fetch set it with boundary for multipart/form-data
      },
      body: formData,
    });

    const data: CreateSchoolSuccess = await res.json();
      
    console.log(data);

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Proxy error:", err);
    const data: CreateSchoolError = {
      success: false,
      message: err instanceof Error ? err.message : "something went wrong."
    };
    return NextResponse.json(data, { status: 500 });
  }
}
