import { type ReactNode } from "react";

interface AIDemoLayoutProps {
  children: ReactNode;
}

export default function AIDemoLayout({ children }: AIDemoLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
}
