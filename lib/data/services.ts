/* ─────────────────────────────────────────────────────────────────────────
   Homepage service grid cards
───────────────────────────────────────────────────────────────────────── */
export type HomepageService = {
  id: number;
  /** "01 / Core Service" */
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  imageUrl: string;
  /** "View Methods" | "View Scope" */
  ctaLabel: string;
  /** true = sm:col-span-2 on homepage grid */
  featured: boolean;
  /** aspect ratio Tailwind class */
  aspectClass: string;
  accent: "orange" | "amber";
  /** If true, card uses bg-ink overlay style instead of standard gradient */
  darkCard: boolean;
};

export const homepageServices: HomepageService[] = [
  {
    id: 1,
    eyebrow: "01 / Core Service",
    title: "NDE / NDT",
    description:
      "Eddy current, near field, magnetic particle, liquid penetrant, ultrasonic, thermography, borescope, PMI and remote visual. No coating removal required.",
    href: "/services/nde-ndt",
    imageUrl:
      "/Non-destructive-evaluation.webp",
    ctaLabel: "View Methods",
    featured: true,
    aspectClass: "aspect-[2/1]",
    accent: "orange",
    darkCard: false,
  },
  {
    id: 2,
    eyebrow: "02 / Preventative",
    title: "Tube Inspection",
    description:
      "Chillers, condensers, evaporators, heat exchangers, fin fans and boilers.",
    href: "/services/tube-inspection",
    imageUrl:
      "/Industrial-tube-inspection-Eddy-current-tube-inspection.webp",
    ctaLabel: "View Methods",
    featured: false,
    aspectClass: "aspect-square",
    accent: "orange",
    darkCard: false,
  },
  {
    id: 3,
    eyebrow: "03 / QA · QC",
    title: "Asset Integrity",
    description:
      "Weld testing, API pressure vessel, storage tanks, piping, 3rd-party verification, audit, dimensional, turnaround.",
    href: "/services/asset-integrity",
    imageUrl:
      "/tube.webp",
    ctaLabel: "View Methods",
    featured: false,
    aspectClass: "aspect-square",
    accent: "orange",
    darkCard: false,
  },
  {
    id: 4,
    eyebrow: "04 / Certification",
    title: "Lifting Equipment",
    description:
      "Certification, wire rope, fork lifts, gantry cranes, cranes & components, work station cranes.",
    href: "/services/lifting-equipment",
    imageUrl:
      "/industrial-lifting-equipment.webp",
    ctaLabel: "View Scope",
    featured: false,
    aspectClass: "aspect-square",
    accent: "amber",
    darkCard: true,
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   Shared method card type (used by all four service pages)
───────────────────────────────────────────────────────────────────────── */
export type MethodCard = {
  id: number;
  number: string;
  title: string;
  description: string;
  /** bg class for icon container */
  iconBg: string;
  /** stroke color for icon SVG */
  iconStroke: string;
  /** SVG path(s) for icon */
  iconPath: string;
  /** true = bg-ink dark card variant (last card of each grid) */
  isDark: boolean;
};

/* ─────────────────────────────────────────────────────────────────────────
   NDE / NDT — 9 methods
───────────────────────────────────────────────────────────────────────── */
export const ndeMethods: MethodCard[] = [
  {
    id: 1,
    number: "01",
    title: "Eddy Current",
    description:
      "Industry-leading technology for detecting surface and near-surface defects in conductive materials. No coating removal required — probe arrays allow fast coverage of large areas.",
    iconBg: "bg-orange/10",
    iconStroke: "#e8600c",
    iconPath:
      "M6.343 6.343A8 8 0 1 0 17.657 17.657M6.343 17.657A8 8 0 1 1 17.657 6.343 M9 9m3 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    isDark: false,
  },
  {
    id: 2,
    number: "02",
    title: "Near Field Testing",
    description:
      "Specialized electromagnetic technique ideal for inspecting ferromagnetic tubes. Effective in finned or fouled tubes where other methods are impractical.",
    iconBg: "bg-orange/10",
    iconStroke: "#e8600c",
    iconPath: "M12 2a10 10 0 0 1 10 10M12 6a6 6 0 0 1 6 6M12 10a2 2 0 0 1 2 2",
    isDark: false,
  },
  {
    id: 3,
    number: "03",
    title: "Magnetic Particle",
    description:
      "Rapid, reliable detection of surface and slightly sub-surface discontinuities in ferromagnetic materials. Widely used for weld and casting inspection.",
    iconBg: "bg-ink",
    iconStroke: "white",
    iconPath: "M12 2v20M2 12h20",
    isDark: false,
  },
  {
    id: 4,
    number: "04",
    title: "Liquid Penetrant",
    description:
      "Cost-effective method for locating surface-breaking defects on any non-porous material. Applicable to metals, plastics, ceramics, and more.",
    iconBg: "bg-orange/10",
    iconStroke: "#e8600c",
    iconPath: "M12 2C8 9 4 13 4 16a8 8 0 0 0 16 0c0-3-4-7-8-14Z",
    isDark: false,
  },
  {
    id: 5,
    number: "05",
    title: "Ultrasonic Testing",
    description:
      "High-frequency sound waves detect internal discontinuities and measure wall thickness on vessels, piping, and structural components with precision.",
    iconBg: "bg-orange/10",
    iconStroke: "#e8600c",
    iconPath: "M22 12 18 12 15 21 9 3 6 12 2 12",
    isDark: false,
  },
  {
    id: 6,
    number: "06",
    title: "Thermography",
    description:
      "Infrared thermal imaging reveals hidden defects, moisture infiltration, electrical hot spots, and insulation failures — completely non-contact and non-invasive.",
    iconBg: "bg-amber/20",
    iconStroke: "#f5b301",
    iconPath: "M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0Z",
    isDark: false,
  },
  {
    id: 7,
    number: "07",
    title: "Borescope & Visual",
    description:
      "High-definition remote visual inspection of inaccessible areas — tubes, tanks, vessels, engines. Real-time video recording for documentation.",
    iconBg: "bg-orange/10",
    iconStroke: "#e8600c",
    iconPath: "M21 21l-4.35-4.35M11 19A8 8 0 1 0 11 3a8 8 0 0 0 0 16z",
    isDark: false,
  },
  {
    id: 8,
    number: "08",
    title: "Positive Material ID",
    description:
      "XRF (X-Ray Fluorescence) analysis confirms alloy composition and identifies material substitutions — critical for process plant safety and compliance.",
    iconBg: "bg-ink",
    iconStroke: "white",
    iconPath: "M3 3h18v18H3zM9 21V9M3 9h18",
    isDark: false,
  },
  {
    id: 9,
    number: "09",
    title: "Remote Visual",
    description:
      "Deploy remotely-operated cameras into confined spaces, tanks, and structures. Safe assessment without entry — full video report documentation.",
    iconBg: "bg-orange/20",
    iconStroke: "#e8600c",
    iconPath:
      "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
    isDark: true,
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   Tube Inspection — 7 equipment types
───────────────────────────────────────────────────────────────────────── */
export const tubeMethods: MethodCard[] = [
  {
    id: 1,
    number: "01",
    title: "Chillers",
    description:
      "HVAC and industrial chiller tube bundle inspection using multi-frequency eddy current. Detect corrosion, erosion, and pitting across copper and titanium tubes.",
    iconBg: "",
    iconStroke: "",
    iconPath: "",
    isDark: false,
  },
  {
    id: 2,
    number: "02",
    title: "Condensers",
    description:
      "Steam and refrigeration condenser inspection for power and process facilities. Identifies plugged, thinned, and cracked tubes before leakage occurs.",
    iconBg: "",
    iconStroke: "",
    iconPath: "",
    isDark: false,
  },
  {
    id: 3,
    number: "03",
    title: "Evaporators",
    description:
      "Refrigeration and industrial evaporator coil and tube inspection. Detects fouling, deposits and wall thickness reduction to keep energy efficiency high.",
    iconBg: "",
    iconStroke: "",
    iconPath: "",
    isDark: false,
  },
  {
    id: 4,
    number: "04",
    title: "Coolers",
    description:
      "Lube oil, intercooler, aftercooler, and process cooler tube inspection. Prevents cross-contamination and unexpected thermal equipment failure.",
    iconBg: "",
    iconStroke: "",
    iconPath: "",
    isDark: false,
  },
  {
    id: 5,
    number: "05",
    title: "Heat Exchangers",
    description:
      "Shell-and-tube heat exchanger inspection across refining, chemical and petrochemical processes. Multi-frequency ECT, NFT and IRIS available.",
    iconBg: "",
    iconStroke: "",
    iconPath: "",
    isDark: false,
  },
  {
    id: 6,
    number: "06",
    title: "Fin Fans",
    description:
      "Air-cooled heat exchanger (fin fan) tube and header inspection. Near-field testing handles finned and fouled external surfaces without removal.",
    iconBg: "",
    iconStroke: "",
    iconPath: "",
    isDark: false,
  },
  {
    id: 7,
    number: "07",
    title: "Boilers",
    description:
      "Fire-tube and water-tube boiler inspection. Detects overheating, internal and external corrosion, pitting and deposition — critical for safe, compliant boiler operation.",
    iconBg: "",
    iconStroke: "",
    iconPath: "",
    isDark: true,
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   Asset Integrity — 9 services
───────────────────────────────────────────────────────────────────────── */
export const assetServices: MethodCard[] = [
  {
    id: 1,
    number: "01",
    title: "Weld Testing & Inspection",
    description:
      "CWB-certified weld inspectors for structural, pressure, and process piping welds. MT, PT, UT, and VT methods available — AWS, ASME, CSA code adherence.",
    iconBg: "bg-orange/10",
    iconStroke: "#e8600c",
    iconPath: "M12 2L2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5",
    isDark: false,
  },
  {
    id: 2,
    number: "02",
    title: "API Boiler & Pressure Vessel",
    description:
      "API 510 code inspections for pressure vessels and boilers. In-service and out-of-service inspection, fitness-for-service assessments and regulatory compliance.",
    iconBg: "bg-orange/10",
    iconStroke: "#e8600c",
    iconPath: "M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18",
    isDark: false,
  },
  {
    id: 3,
    number: "03",
    title: "Storage Tanks",
    description:
      "API 653 above-ground storage tank inspection. Floor scanning, shell UT, roof assessment, fitness for service and regulatory reporting.",
    iconBg: "bg-ink",
    iconStroke: "white",
    iconPath: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 8v4M12 16h.01",
    isDark: false,
  },
  {
    id: 4,
    number: "04",
    title: "Piping Systems",
    description:
      "API 570 piping inspection — corrosion under insulation, wall thickness surveys, weld inspection, fitness-for-service and risk-based inspection planning.",
    iconBg: "bg-orange/10",
    iconStroke: "#e8600c",
    iconPath: "M3 12h18M3 6h18M3 18h18",
    isDark: false,
  },
  {
    id: 5,
    number: "05",
    title: "Visual Inspection",
    description:
      "Systematic visual evaluation by certified inspectors. Structures, welds, coatings, flange faces, equipment condition — documented and reported to applicable codes.",
    iconBg: "bg-orange/10",
    iconStroke: "#e8600c",
    iconPath:
      "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
    isDark: false,
  },
  {
    id: 6,
    number: "06",
    title: "Third Party Verification",
    description:
      "Independent third-party inspection for regulatory, insurance, and contractual compliance. Owner's inspector roles and cross-verification of fabrication and construction.",
    iconBg: "bg-amber/20",
    iconStroke: "#f5b301",
    iconPath: "M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    isDark: false,
  },
  {
    id: 7,
    number: "07",
    title: "Audit Services",
    description:
      "QA/QC audit programs to confirm contractor and supplier compliance. Procedure review, inspection record audit, and non-conformance reporting.",
    iconBg: "bg-orange/10",
    iconStroke: "#e8600c",
    iconPath:
      "M9 17H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m6 16h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4M9 12h6M9 8h6M9 16h6",
    isDark: false,
  },
  {
    id: 8,
    number: "08",
    title: "Dimensional",
    description:
      "Precision dimensional inspection and verification. Confirm fabrication meets engineering drawings — critical for pressure equipment, structural members, and complex assemblies.",
    iconBg: "bg-orange/10",
    iconStroke: "#e8600c",
    iconPath: "M4 7h16M4 12h16M4 17h7M15 15l3 3 3-3M18 12v6",
    isDark: false,
  },
  {
    id: 9,
    number: "09",
    title: "Turnaround Services",
    description:
      "Comprehensive inspection planning and execution for planned plant shutdowns. Multi-discipline NDE, pressure equipment, piping and weld inspection — complete turnaround coverage, on schedule.",
    iconBg: "bg-orange/20",
    iconStroke: "#e8600c",
    iconPath: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
    isDark: true,
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   Lifting Equipment — 6 categories
───────────────────────────────────────────────────────────────────────── */
export const liftingTypes: MethodCard[] = [
  {
    id: 1,
    number: "01",
    title: "Certification",
    description:
      "Comprehensive lifting equipment certification programs covering initial certification, periodic inspection, and re-certification to all applicable provincial and national regulations and CSA standards.",
    iconBg: "bg-amber/20",
    iconStroke: "#f5b301",
    iconPath: "M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    isDark: false,
  },
  {
    id: 2,
    number: "02",
    title: "Wire Rope",
    description:
      "Electromagnetic and visual inspection of wire rope for broken wires, corrosion, loss of metallic area, kinks, and fatigue. Essential for crane, hoist, and rigging safety compliance.",
    iconBg: "bg-amber/20",
    iconStroke: "#f5b301",
    iconPath:
      "M3 12C3 12 5 5 12 5s9 7 9 7-2 7-9 7-9-7-9-7ZM12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
    isDark: false,
  },
  {
    id: 3,
    number: "03",
    title: "Fork Lifts",
    description:
      "Annual forklift certification and inspection covering mast assembly, forks, hydraulics, brakes, load capacity, and safety devices. Documentation for WorkSafe and regulatory bodies.",
    iconBg: "bg-ink",
    iconStroke: "white",
    iconPath:
      "M2 7h9v11H2zM11 10h3l3 5H2M5.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM14.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
    isDark: false,
  },
  {
    id: 4,
    number: "04",
    title: "Gantry Cranes",
    description:
      "Full structural, mechanical, and electrical inspection of free-standing and rail-mounted gantry cranes. Load test witnessing, runway alignment, and end-stop verification.",
    iconBg: "bg-amber/20",
    iconStroke: "#f5b301",
    iconPath: "M4 19h16M6 19V9m12 10V9M2 9h20L12 2 2 9ZM10 14h4v5h-4z",
    isDark: false,
  },
  {
    id: 5,
    number: "05",
    title: "Cranes & Components",
    description:
      "Overhead bridge cranes, jib cranes, hoists, hooks, slings, and rigging hardware. NDE of critical structural weldments and hooks, load testing, and re-certification packages.",
    iconBg: "bg-amber/20",
    iconStroke: "#f5b301",
    iconPath:
      "M12 2v6M12 16v6M2 12h6M16 12h6m-2.93-7.07 2.83 2.83M4.1 19.9l2.83-2.83M4.1 4.1l2.83 2.83M16.97 19.07l2.83-2.83",
    isDark: false,
  },
  {
    id: 6,
    number: "06",
    title: "Work Station Cranes",
    description:
      "Under-hung and top-running work station crane systems including monorails, enclosed track, and KBK systems. Certification, structural assessment, and periodic re-inspection.",
    iconBg: "bg-amber/20",
    iconStroke: "#f5b301",
    iconPath: "M3 11h18v11H3zM8 11V7a4 4 0 1 1 8 0v4",
    isDark: true,
  },
];
