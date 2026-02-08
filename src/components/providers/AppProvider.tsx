"use client";

import { useState, ReactNode } from "react";
import { Preloader } from "@/components/animations";
import SmoothScrollProvider from "./SmoothScrollProvider";

interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setIsLoaded(true)} />
      <SmoothScrollProvider>
        <div
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          {children}
        </div>
      </SmoothScrollProvider>
    </>
  );
}
