interface ScanCardProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "a" | "article";
}

export default function ScanCard({
  children,
  className = "",
}: ScanCardProps) {
  return (
    <div className={`scan-card ${className}`}>
      {children}
    </div>
  );
}
