"use client"

import { ReactNode } from "react";
import ClickRipple from "@/components/ClickRipple";

export default function LayoutClient({ children }: { children: ReactNode }) {
  return (
    <ClickRipple>
      {children}
    </ClickRipple>
  );
}
