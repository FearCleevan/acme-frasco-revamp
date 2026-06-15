export type Industry = {
  id: number;
  name: string;
  imageUrl: string;
};

/** 6 cards for homepage horizontal scroll */
export const homepageIndustries: Industry[] = [
  {
    id: 1,
    name: "Energy",
    imageUrl:
      "/Non-destructive-testing-and-evaluation-1.webp",
  },
  {
    id: 2,
    name: "Refining &\nUpgrading",
    imageUrl:
      "/6.webp",
  },
  {
    id: 3,
    name: "Power\nGeneration",
    imageUrl:
      "/7.webp",
  },
  {
    id: 4,
    name: "Marine",
    imageUrl:
      "/133252734_m-scaled.webp",
  },
  {
    id: 5,
    name: "Mining",
    imageUrl:
      "/1.webp",
  },
  {
    id: 6,
    name: "Construction &\nOffshore",
    imageUrl:
      "/4.webp",
  },
];

/** 12 tiles for the About page industries grid */
export type IndustryTile = {
  name: string;
  accentColor: "orange" | "amber";
};

export const aboutIndustries: IndustryTile[] = [
  { name: "Energy",                      accentColor: "orange" },
  { name: "Refining & Upgrading",        accentColor: "orange" },
  { name: "Power Generation",            accentColor: "orange" },
  { name: "Heating & Cooling",           accentColor: "orange" },
  { name: "Marine",                      accentColor: "orange" },
  { name: "Mining",                      accentColor: "orange" },
  { name: "Welding & Fabrication",       accentColor: "orange" },
  { name: "Offshore",                    accentColor: "orange" },
  { name: "Pulp & Paper",                accentColor: "orange" },
  { name: "Maintenance & Construction",  accentColor: "amber"  },
  { name: "Environmental",               accentColor: "amber"  },
  { name: "Crane & Lifting",             accentColor: "amber"  },
];
