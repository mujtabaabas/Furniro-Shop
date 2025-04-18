'use client'

import { ClerkProvider } from "@clerk/nextjs"
import { StoreProvider } from "@/lib/store"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <StoreProvider>
        {children}
      </StoreProvider>
    </ClerkProvider>
  )
} 