import type { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";

export const AppProviders = ({children}:{ children:ReactNode})=>{
    const queryClient = new QueryClient()
    return  <QueryClientProvider client={queryClient}>
        <AuthProvider>
        {children}
    </AuthProvider>
<<<<<<< HEAD
    </QueryClientProvider>
   
    
}
=======
}
>>>>>>> redux-toolkit
