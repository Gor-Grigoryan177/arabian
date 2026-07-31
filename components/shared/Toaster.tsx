"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: "#1e1b17",
          border: "1px solid #2a2620",
          color: "#faf6f0",
          fontSize: "12px",
          borderRadius: "100px",
          padding: "10px 24px",
        },
      }}
    />
  );
}
