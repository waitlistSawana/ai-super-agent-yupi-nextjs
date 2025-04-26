"use client";

import * as React from "react";
import { unstable_ViewTransition as ViewTransition } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  /**
   * 复制成功后的延迟时间（毫秒），在此时间后重置按钮状态
   * @default 2000
   */
  delay?: number;
}

/**
 * 复制按钮组件
 * 提供复制功能和复制成功的视觉反馈
 */
export function CopyButton({
  value,
  delay = 2000,
  className,
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => {
        setHasCopied(false);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [hasCopied, delay]);

  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn("cursor-pointer", className)}
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setHasCopied(true);
      }}
      {...props}
    >
      {hasCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      <span className="sr-only">复制代码</span>
    </Button>
  );
}
