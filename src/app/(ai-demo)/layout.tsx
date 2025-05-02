import Navbar from "@/components/navbar";
import { type ReactNode } from "react";

interface AIDemoLayoutProps {
  children: ReactNode;
}

export default function AIDemoLayout({ children }: AIDemoLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Navbar className="fixed top-0 right-0 left-0 z-50" />
      {children}
    </div>
  );
}
