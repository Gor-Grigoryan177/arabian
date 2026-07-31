import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, invalid, ...props }, ref) => {
    return (
      <input
        type={type}
        aria-invalid={invalid}
        className={cn(
          "w-full rounded-sm border border-border bg-surface2 px-3.5 py-3 font-body text-[13px] text-ink outline-none transition-colors placeholder:text-muted focus:border-gold-dim",
          invalid &&
            "border-[#c0524a] bg-[#c0524a]/[0.06] focus:border-[#c0524a]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
