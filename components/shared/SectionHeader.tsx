import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  align = "left",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";
  return (
    <div className={cn("mb-10", isCenter && "text-center", className)}>
      <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-gold">
        {eyebrow}
      </p>
      <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.15] text-warmwhite">
        {title}
      </h2>
      <div className={cn("mt-5 h-px w-12 bg-gold", isCenter && "mx-auto")} />
    </div>
  );
}
