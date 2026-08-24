import { NextResponse } from "next/server";
import { saveLead } from "@/lib/admin-store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, projectType, message } = body;

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Valid name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 7) {
      return NextResponse.json(
        { success: false, error: "Valid phone number is required." },
        { status: 400 }
      );
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Valid email address is required." },
        { status: 400 }
      );
    }

    // Save lead into Admin Store database
    const source: "Brochure Download" | "Enquiry Modal" | "Contact Page" | "VIP Site Visit" =
      projectType?.includes("Brochure")
        ? "Brochure Download"
        : projectType?.includes("VIP")
        ? "VIP Site Visit"
        : message
        ? "Contact Page"
        : "Enquiry Modal";

    const savedLead = saveLead({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      projectType: projectType || "General Inquiry",
      message: message || "Enquiry submitted from website.",
      source,
      status: "New",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully.",
        data: {
          leadId: savedLead.id,
          receivedAt: savedLead.createdAt,
          referenceId: savedLead.id,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[API CONTACT ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Internal server error processing enquiry." },
      { status: 500 }
    );
  }
}
