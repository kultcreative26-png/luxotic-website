import { NextResponse } from "next/server";
import { getSiteSettings, saveSiteSettings, SiteSettings } from "@/lib/admin-store";

export async function GET() {
  try {
    const settings = getSiteSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const updatedSettings: SiteSettings = body;

    if (!updatedSettings.contact || !updatedSettings.leadership) {
      return NextResponse.json(
        { success: false, error: "Incomplete settings payload." },
        { status: 400 }
      );
    }

    saveSiteSettings(updatedSettings);
    return NextResponse.json({ success: true, settings: updatedSettings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
