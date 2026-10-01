"use client"

import { ReactNode } from "react";
import ClickQuantum from "@/components/ClickQuantum";

export default function LayoutClient({ children }: { children: ReactNode }) {
  return (
    <ClickQuantum>
      {children}
    </ClickQuantum>
  );
}
