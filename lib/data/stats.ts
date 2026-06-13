export type StatItem = {
  value: string;
  label: string;
  barColor: "orange" | "ink" | "amber";
};

export const homepageStats: StatItem[] = [
  { value: "24/7",     label: "Emergency Response",  barColor: "orange" },
  { value: "9",        label: "NDE / NDT Methods",   barColor: "ink"    },
  { value: "3",        label: "Cert Standards",      barColor: "orange" },
  { value: "13+",      label: "Industries Served",   barColor: "amber"  },
  { value: "Same Day", label: "On-Site Results",     barColor: "ink"    },
];
