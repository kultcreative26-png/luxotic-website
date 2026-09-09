import { MetadataRoute } from "next";
import { PROJECTS_DATA } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.luxoticinfra.com";

  const projectUrls = PROJECTS_DATA.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const staticUrls = [
    { route: "", priority: 1.0, changeFrequency: "daily" as const },
    { route: "/about-us", priority: 0.9, changeFrequency: "weekly" as const },
    { route: "/projects", priority: 0.95, changeFrequency: "daily" as const },
    { route: "/our-approach", priority: 0.85, changeFrequency: "monthly" as const },
    { route: "/sustainability", priority: 0.85, changeFrequency: "monthly" as const },
    { route: "/contact", priority: 0.9, changeFrequency: "weekly" as const },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  return [...staticUrls, ...projectUrls];
}
