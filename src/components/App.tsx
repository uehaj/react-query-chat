import React from "react";
import ChatPanel from './ChatPanel';
import { QueryClient, QueryClientProvider } from 'react-query'
import { CssBaseline } from '@material-ui/core';
import Header from './Header';

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
    <QueryClientProvider client={queryClient} >
      <CssBaseline />
      <Header />
      <ChatPanel />
    </QueryClientProvider >
  );
}
