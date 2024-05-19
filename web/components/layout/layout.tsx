import { AppShell } from '@mantine/core';
import { Header } from './header';

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <>
    <AppShell
      padding="xl"
    >

      <AppShell.Main>
        <Header />

        {children}
      </AppShell.Main>
    </AppShell>
  </>
);
