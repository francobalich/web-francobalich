interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "blue" | "green" | "upcoming";
}

export default function Badge({ children, variant = "default" }: BadgeProps) {
  const styles = {
    default: "bg-white/[0.06] text-zinc-400 border-white/[0.08]",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    upcoming: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
