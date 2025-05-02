"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, Github, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

/**
 * Navbar component for the application
 *
 * @param className - Optional className for styling
 * @returns A navigation bar with home, back and github buttons
 */
export default function Navbar({
  className,
  ...props
}: React.ComponentProps<"div"> & { className?: string }) {
  const router = useRouter();

  /**
   * Handle back button click
   */
  const handleBack = () => {
    router.back();
  };

  return (
    <div
      className={cn(
        "bg-background flex w-full items-center justify-between border-b px-6 py-4",
        className,
      )}
      {...props}
    >
      {/* Left section with logo/title */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-primary">AI</span> Super Agent
        </Link>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={handleBack} title="返回">
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" asChild title="主页">
          <Link href="/">
            <Home className="h-5 w-5" />
          </Link>
        </Button>

        <Button variant="ghost" size="icon" asChild title="GitHub">
          <Link
            href="https://github.com/waitlistSawana/ai-super-agent-yupi-nextjs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
