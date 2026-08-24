import { NextResponse } from "next/server";
import { getBrochures, saveBrochures } from "@/lib/admin-store";
import { DownloadableDoc } from "@/data/downloads";

export async function GET() {
  try {
    const brochures = getBrochures();
    return NextResponse.json({ success: true, brochures, total: brochures.length });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, doc, brochures: updatedList } = body;

    if (action === "bulk_update" && Array.isArray(updatedList)) {
      saveBrochures(updatedList);
      return NextResponse.json({ success: true, brochures: updatedList });
    }

    if (doc && doc.id) {
      const list = getBrochures();
      const idx = list.findIndex((b) => b.id === doc.id);
      if (idx >= 0) {
        list[idx] = { ...list[idx], ...doc };
      } else {
        list.push(doc as DownloadableDoc);
      }
      saveBrochures(list);
      return NextResponse.json({ success: true, brochures: list });
    }

    return NextResponse.json({ success: false, error: "Invalid brochure payload." }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
