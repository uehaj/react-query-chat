import React from "react";
import ChatPanel from './ChatPanel';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 300000,
      refetchInterval: 1000,
    },
  }
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatPanel />
    </QueryClientProvider>
  );
}
