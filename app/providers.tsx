"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { CartProvider } from "@/app/context/cart-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  );
}