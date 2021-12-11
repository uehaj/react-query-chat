import React from "react";
import ChatPanel from './ChatPanel';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatPanel />
    </QueryClientProvider>
  );
}
