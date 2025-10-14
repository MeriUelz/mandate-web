import {
  Outlet,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import { TRPCReactProvider } from "~/trpc/react";
import { GoogleAnalytics } from "~/components/GoogleAnalytics";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const isFetching = useRouterState({ select: (s) => s.isLoading });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <TRPCReactProvider>
      <GoogleAnalytics />
      <Outlet />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#eff6ff',
            color: '#1e3a8a',
            border: '1px solid #bfdbfe',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#1d4ed8',
              secondary: '#eff6ff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#1e40af',
              secondary: '#eff6ff',
            },
          },
        }}
      />
    </TRPCReactProvider>
  );
}
