import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://frasco.ca";
  const lastModified = new Date("2026-06-15");

  return [
    { url: base, lastModified, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/services/nde-ndt`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/tube-inspection`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/asset-integrity`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/lifting-equipment`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
