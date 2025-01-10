import { cn } from "@/lib/utils";
import { Climate_Crisis } from "next/font/google";

const climateCrisis = Climate_Crisis({ subsets: ["latin"] });

function LogoLayer ({ className, textClassName }: { className?: string, textClassName?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className={cn("text-2xl font-bold tracking-wide", climateCrisis.className, textClassName)}>
        OP
      </span>
      <span className={cn("text-2xl font-bold tracking-wider", climateCrisis.className, textClassName)}>
        T
      </span>
      <span className={cn("text-2xl font-bold tracking-wider", climateCrisis.className, textClassName)}>
        ED.
      </span>
    </div>
  )
}

export function Logo({ className, textClassName }: { className?: string, textClassName?: string }) {
  return (
    <div className={`flex items-center relative ${className}`}>
      <LogoLayer className="text-primary absolute z-10" textClassName={cn(textClassName, "text-primary")} />
      <LogoLayer className="absolute z-[5] translate-y-1" textClassName={cn(textClassName, "text-zinc-300 dark:text-zinc-600")} />
      <LogoLayer className="absolute z-0 translate-y-2" textClassName={cn(textClassName, "text-zinc-100 dark:text-zinc-800")} />
    </div>
  );
}
