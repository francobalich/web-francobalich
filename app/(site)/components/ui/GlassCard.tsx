import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  blue?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
  blue = false,
}: GlassCardProps) {
  return (
    <div
      className={`
        rounded-2xl
        ${blue ? "glass-blue" : "glass"}
        ${hover ? "glass-hover" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
