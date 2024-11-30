import { signUp } from "@/app/(auth)/_lib/service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();

    // Validasi input
    if (!req.email || !req.password || !req.fullname || !req.phone) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const res = await signUp(req);

    // Menyusun respon dengan status sukses ataupun gagal
    if (res.success) {
      return NextResponse.json({ success: true, message: res.message });
    } else {
      return NextResponse.json(
        { success: false, message: res.message },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error during sign-up:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during sign-up" },
      { status: 500 }
    );
  }
}
