"use client";

import GenerateTextDemo from "@/components/generate-text-demo";
import { cn } from "@/lib/utils";

type GenerateTextPageComponentProps = {
  className?: string;
};

export default function GenerateTextPageComponent({
  className,
  ...props
}: React.ComponentProps<"div"> & GenerateTextPageComponentProps) {
  return (
    <div className={cn(className)} {...props}>
      <GenerateTextDemo />
    </div>
  );
}
