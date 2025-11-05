"use client";

import { usePathname } from "next/navigation";
import FloatingActions from "./FloatingActions";

export default function ConditionalFloatingActions() {
  const pathname = usePathname();
  
  // Hide floating actions on service page
  if (pathname === "/service") {
    return null;
  }
  
  return <FloatingActions phone="971507815384" />;
}

