interface BlueprintSectionProps {
  children: React.ReactNode;
  className?: string;
  opacity?: string;
  id?: string;
}

export default function BlueprintSection({
  children,
  className = "",
  opacity = "opacity-50",
  id,
}: BlueprintSectionProps) {
  return (
    <div id={id} className={`relative ${className}`}>
      <div className={`absolute inset-0 blueprint ${opacity} pointer-events-none`} />
      {children}
    </div>
  );
}
