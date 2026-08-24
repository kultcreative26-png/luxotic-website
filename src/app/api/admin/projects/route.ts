import { NextResponse } from "next/server";
import { getProjects, upsertProject, deleteProject } from "@/lib/admin-store";
import { Project } from "@/data/projects";

export async function GET() {
  try {
    const projects = getProjects();
    return NextResponse.json({ success: true, projects, total: projects.length });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const project: Project = body;

    if (!project.name || !project.slug) {
      return NextResponse.json(
        { success: false, error: "Project Name and Slug are required." },
        { status: 400 }
      );
    }

    // Default arrays if missing
    project.overview = project.overview || ["Project overview pending."];
    project.highlights = project.highlights || ["Premium location in Delhi NCR"];
    project.amenities = project.amenities || [{ name: "Gated Security", icon: "ShieldCheck" }];
    project.gallery = project.gallery || ["/images/fresh/luxotic-residences.jpg"];
    project.heroImage = project.heroImage || "/images/fresh/luxotic-residences.jpg";
    project.status = project.status || "Ongoing";
    project.brochurePath = project.brochurePath || "/downloads/brochure.pdf";

    const saved = upsertProject(project);
    return NextResponse.json({ success: true, project: saved });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ success: false, error: "Project slug is required." }, { status: 400 });
    }

    const deleted = deleteProject(slug);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Project not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Project deleted successfully." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
