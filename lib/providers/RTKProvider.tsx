import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

export const RTKProvider = ({ children }: { children: React.ReactNode }) => {
    const [client] = useState(new QueryClient())

    return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}