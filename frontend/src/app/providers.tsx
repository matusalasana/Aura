import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from '../contexts/ThemeContext';
import { AuthInitializer } from '../contexts/AuthInitializer';

const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthInitializer>
          {children}
        </AuthInitializer>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}