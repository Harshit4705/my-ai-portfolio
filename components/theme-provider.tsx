"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// We can type this better if we install next-themes type definitions, but for now this is fine.
// Using React.ComponentProps is a good way to forward props.
export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
