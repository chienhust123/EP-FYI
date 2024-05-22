import { AppShell, Button, Flex, Group, Image } from '@mantine/core';
import { UserInfo } from './user-info/UserInfo';
import { useAuth } from '@/share/hooks/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  const { replace, pathname } = useRouter()

  useEffect(() => {
    if (!loading && !isLoggedIn && pathname !== '/' && pathname !== '') {
      replace('/')
    }
  }, [pathname, isLoggedIn, loading])

  return (
    <>
      <AppShell
        header={{ height: 56 }}
        padding="md"
      >
        <AppShell.Header pl='md' pr='md'>
          <Flex align='center' justify={'space-between'}>
            <Image pl='md' src="https://theme.hstatic.net/200000696647/1001189205/14/logo.png?v=297" w={237} />
            <Group align='center'>
              <Link href="/upload"><Button>Upload Your Offer</Button></Link>
              <UserInfo />
            </Group>

          </Flex>
        </AppShell.Header>

        <AppShell.Main >{children}</AppShell.Main>
      </AppShell>
    </>
  )
};
