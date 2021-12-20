import React from "react";
import ChatPanel from './ChatPanel';
import { QueryClient, QueryClientProvider } from 'react-query'
import { CssBaseline } from '@material-ui/core';
import Header from './Header';
import { FETCH_INTERVAL, EXPIRE_TIME } from "../fetchData";
import { ReactQueryDevtools } from 'react-query/devtools'
import LoginForm from "./LoginForm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: true,
      refetchInterval: FETCH_INTERVAL,
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
      <LoginForm />
      <div>
        {DEBUG && <ReactQueryDevtools />}
      </div>
    </QueryClientProvider >
  );
}
