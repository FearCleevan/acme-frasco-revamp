export type Certification = {
  id: number;
  title: string;
  description: string;
  /** Inline SVG path data for the icon */
  iconPath: string;
};

export const certifications: Certification[] = [
  {
    id: 1,
    title: "CAN/CGSB-48.9712",
    description:
      "National standard for NDE personnel qualification and certification. Level I, II, and III technicians — the gold standard for NDT personnel in Canada.",
    iconPath:
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016Z",
  },
  {
    id: 2,
    title: "API 510 · 570 · 653",
    description:
      "American Petroleum Institute certification for pressure vessels (510), aboveground piping (570), and aboveground storage tanks (653) — essential for energy and process industries.",
    iconPath: "M3 3h18v18H3zM9 3v18M3 9h18M3 15h18",
  },
  {
    id: 3,
    title: "CWB CSA W178.2",
    description:
      "Canadian Welding Bureau certification for welding inspection personnel. Ensures structural, pressure, and process weld inspections meet the highest code requirements.",
    iconPath: "M12 2L2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5",
  },
];
