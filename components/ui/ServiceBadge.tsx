interface ServiceBadgeProps {
  children: React.ReactNode;
}

export default function ServiceBadge({ children }: ServiceBadgeProps) {
  return (
    <span className="text-[10px] font-mono uppercase tracking-widest text-white bg-orange inline-block px-2 py-0.5">
      {children}
    </span>
  );
}
