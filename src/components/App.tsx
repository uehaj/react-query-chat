import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ChatPanel from './ChatPanel';
import { QueryClient, QueryClientProvider } from 'react-query'
import { CssBaseline } from "@mui/material";
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
  const theme = createTheme();

  return (
    <QueryClientProvider client={queryClient} >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <ChatPanel />
        <LoginForm />
        <div>
          {DEBUG && <ReactQueryDevtools />}
        </div>
      </ThemeProvider>
    </QueryClientProvider >
  );
}
