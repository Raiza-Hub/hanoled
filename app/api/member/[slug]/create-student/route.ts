import { env } from "@/env";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
    const { slug } = await params;
    const {
      firstName,
      lastName,
      middleName,
      image,
      gender,
      dateOfBirth,
      guardianFullName,
      guardianPhone,
      guardianEmail,
      address,
      className,
      admissionDate
    } = await req.json();
      
      console.log(
        firstName,
      lastName,
      middleName,
      image,
      gender,
      dateOfBirth,
      guardianFullName,
      guardianPhone,
      guardianEmail,
      address,
      className,
      admissionDate);
    

    const cookieHeader = req.headers.get("cookie") || "";
      
    const res = await fetch(`${env.SERVER_URL}/api/member/create/student/${slug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieHeader,
        },
      credentials: "include",
      body: JSON.stringify({
        firstName,
        lastName,
        middleName,
        image,
        gender,
        dateOfBirth,
        guardianFullName,
        guardianPhone,
        guardianEmail,
        address,
        className,
        admissionDate
      })
    });

      const data = await res.json();
      console.log(data);
      
            
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
