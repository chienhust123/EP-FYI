import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { AuthContext } from '@/share/hooks/auth';
import { queryClient } from '@/services/query';
import { theme } from '@/theme';
import { Layout } from '@/share/layout';

const AllTheProviders: React.FC<React.PropsWithChildren> = ({ children }) => (
  <MantineProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <AuthContext>
        <Layout>
          {children}
        </Layout>
      </AuthContext>
    </QueryClientProvider>
  </MantineProvider>
);

export const renderApp = (element: React.ReactElement) =>
  render(element, { wrapper: AllTheProviders });
