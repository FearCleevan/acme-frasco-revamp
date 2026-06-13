export type ServiceOption = {
  value: string;
  label: string;
};

export const serviceOptions: ServiceOption[] = [
  { value: "nde-ndt",           label: "NDE / NDT" },
  { value: "tube-inspection",   label: "Tube Inspection" },
  { value: "asset-integrity",   label: "Asset Integrity" },
  { value: "lifting-equipment", label: "Lifting Equipment" },
  { value: "multiple",          label: "Multiple Services" },
  { value: "unsure",            label: "Not Sure — Please Advise" },
];
