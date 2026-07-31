import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-[11px] font-medium uppercase tracking-[0.18em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-gold text-black hover:bg-gold-light hover:-translate-y-px",
        outline:
          "border border-gold-dim text-gold hover:border-gold hover:bg-gold/[0.06]",
        ghost: "text-muted hover:text-gold",
      },
      size: {
        default: "px-8 py-3.5",
        sm: "px-5 py-2.5",
        icon: "h-9 w-9 rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
