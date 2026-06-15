import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FRASCO Industrial Inspections",
    short_name: "FRASCO",
    description:
      "Certified NDE/NDT, tube inspection, asset integrity and lifting equipment services in Nova Scotia.",
    start_url: "/",
    display: "standalone",
    background_color: "#111111",
    theme_color: "#e8600c",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
