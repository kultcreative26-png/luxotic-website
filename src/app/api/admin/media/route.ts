import { NextResponse } from "next/server";
import { getMediaConfig, saveMediaConfig, MediaConfig } from "@/lib/admin-store";

export async function GET() {
  try {
    const media = getMediaConfig();
    return NextResponse.json({ success: true, media });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { heroVideo, gallery } = body;

    const current = getMediaConfig();

    const updated: MediaConfig = {
      heroVideo: heroVideo ? { ...current.heroVideo, ...heroVideo } : current.heroVideo,
      gallery: gallery ? gallery : current.gallery,
    };

    saveMediaConfig(updated);
    return NextResponse.json({ success: true, media: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
