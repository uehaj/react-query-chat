import React from "react";
import ChatPanel from './ChatPanel';
import { QueryClient, QueryClientProvider } from 'react-query'
import { CssBaseline } from '@material-ui/core';
import Header from './Header';
import { FETCH_INTERVAL, STALE_TIME, EXPIRE_TIME } from "../fetchData";
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: true,
      refetchInterval: FETCH_INTERVAL,
      staleTime: STALE_TIME,
      cacheTime: EXPIRE_TIME,
    },
  }
});

const DEBUG = true;

export default function App() {
  return (
    <QueryClientProvider client={queryClient} >
      <CssBaseline />
      <Header />
      <ChatPanel />
      {DEBUG && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider >
  );
}
