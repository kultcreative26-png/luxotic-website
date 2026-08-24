import { NextResponse } from "next/server";
import { getLeads, updateLeadStatus, deleteLead, saveLead, getVisitors } from "@/lib/admin-store";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format");
    const includeVisitors = searchParams.get("includeVisitors") === "true";

    const leads = getLeads();

    if (format === "csv") {
      // Generate CSV string
      const headers = ["Lead ID", "Full Name", "Phone", "Email", "Project / Interest", "Source", "Status", "Message", "Date Received"];
      const rows = leads.map((l) => [
        `"${l.id}"`,
        `"${(l.name || "").replace(/"/g, '""')}"`,
        `"${(l.phone || "").replace(/"/g, '""')}"`,
        `"${(l.email || "").replace(/"/g, '""')}"`,
        `"${(l.projectType || "").replace(/"/g, '""')}"`,
        `"${(l.source || "").replace(/"/g, '""')}"`,
        `"${(l.status || "").replace(/"/g, '""')}"`,
        `"${(l.message || "").replace(/"/g, '""')}"`,
        `"${new Date(l.createdAt).toLocaleString("en-IN")}"`,
      ]);

      const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

      return new Response(csvContent, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="LUXOTIC-Leads-${new Date().toISOString().slice(0, 10)}.csv"`,
        },
      });
    }

    const responseData: any = {
      success: true,
      leads,
      totalLeads: leads.length,
      newLeadsCount: leads.filter((l) => l.status === "New").length,
    };

    if (includeVisitors) {
      const visitors = getVisitors();
      responseData.visitors = visitors;
      responseData.totalVisitors = visitors.length;
    }

    return NextResponse.json(responseData);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, projectType, message, source, status } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and Phone number are required." },
        { status: 400 }
      );
    }

    const createdLead = saveLead({
      name,
      phone,
      email: email || "",
      projectType: projectType || "General Inquiry",
      message: message || "",
      source: source || "Quick Lead",
      status: status || "New",
    });

    return NextResponse.json({ success: true, lead: createdLead });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Lead ID and Status are required." },
        { status: 400 }
      );
    }

    const updated = updateLeadStatus(id, status, notes);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Lead not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Lead ID is required." }, { status: 400 });
    }

    const deleted = deleteLead(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Lead not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Lead deleted successfully." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
