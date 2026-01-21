"use client";

import { ReactNode } from "react";
import { LayoutProvider, UiProvider } from "@uigovpe/components";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "@/lib/apolloClient";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <LayoutProvider template="backoffice" breakpoint={1024}>
      <UiProvider>
        <ApolloProvider client={apolloClient}>
          {children}
        </ApolloProvider>
      </UiProvider>
    </LayoutProvider>
  );
}
