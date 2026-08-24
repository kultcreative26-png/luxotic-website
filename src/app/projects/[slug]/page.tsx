import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS_DATA } from "@/data/projects";
import ProjectDetailClient from "@/components/ProjectDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

const getProjectBySlug = (slug: string) => {
  if (slug === "luxotic-signature-farmhouses") {
    return PROJECTS_DATA.find((p) => p.categorySlug === "farmhouses");
  }
  return PROJECTS_DATA.find((p) => p.slug === slug);
};

export async function generateStaticParams() {
  const baseParams = PROJECTS_DATA.map((project) => ({
    slug: project.slug,
  }));
  return [...baseParams, { slug: "luxotic-signature-farmhouses" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | LUXOTIC Infrastructure",
    };
  }

  const pageUrl = `https://www.luxoticinfra.com/projects/${project.slug}`;

  return {
    title: `${project.name} – ${project.tagline} | LUXOTIC Infrastructure`,
    description: `${project.name}: ${project.shortDescription} Located at ${project.location}.`,
    keywords: [
      project.name,
      project.category,
      project.location,
      "Plots near Jewar Airport",
      "Farmhouses Yamuna Expressway",
      "LUXOTIC Infrastructure",
      "Luxury Real Estate NCR",
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${project.name} | LUXOTIC Infrastructure`,
      description: project.shortDescription,
      url: pageUrl,
      images: [
        {
          url: project.heroImage,
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | LUXOTIC Infrastructure`,
      description: project.shortDescription,
      images: [project.heroImage],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": project.name,
    "description": project.shortDescription,
    "image": `https://www.luxoticinfra.com${project.heroImage}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": project.location,
      "addressRegion": "Uttar Pradesh",
      "addressCountry": "IN",
    },
    "amenityFeature": project.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      "name": a.name,
      "value": true,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectSchema),
        }}
      />
      <ProjectDetailClient project={project} />
    </>
  );
}
