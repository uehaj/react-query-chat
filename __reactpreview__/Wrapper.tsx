import React from "react";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  }
);

export const Wrapper: React.FC = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
