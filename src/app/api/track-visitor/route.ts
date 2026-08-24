import { NextResponse } from "next/server";
import { logVisitor } from "@/lib/admin-store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { page, referrer, device, browser } = body;

    const logged = logVisitor({
      page: page || "/",
      referrer: referrer || "Direct",
      device: device || "Desktop",
      browser: browser || "Unknown",
    });

    return NextResponse.json({ success: true, log: logged });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
