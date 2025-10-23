import { env } from "@/env";
import { CreateSchoolError, CreateSchoolSuccess } from "@/type";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
      const {
        name,
        slug,
        logo,
        metadata,
        email,
        country,
        address,
        city,
        state,
        zipCode,
        category,
        schoolType,
        website,
        socialLinks
    } = await req.json();
      
      
    const cookieHeader = req.headers.get("cookie") || "";
      
    const res = await fetch(`${env.SERVER_URL}/api/organization/create`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Cookie": cookieHeader,
        },
      credentials: "include",
      body: JSON.stringify({ name, slug, logo, metadata, email, country, address, city, state, zipCode, category, schoolType, website, socialLinks })
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
