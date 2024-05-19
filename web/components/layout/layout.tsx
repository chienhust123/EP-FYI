import { AppShell, Flex, Image } from '@mantine/core';
import { UserInfo } from './user-info/UserInfo';
import { useAuth } from '@/context/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';



export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const { replace, pathname } = useRouter()

  useEffect(() => {
    if (!isLoggedIn && (pathname !== '/' && pathname !== '')) {
      replace('/')
    }
  }, [pathname, isLoggedIn])

  return (
    <>
      <AppShell
        header={{ height: 56 }}
        padding="md"
      >
        <AppShell.Header pl='md' pr='md'>
          <Flex align='center' justify={'space-between'}>
            <Image pl='md' src="https://theme.hstatic.net/200000696647/1001189205/14/logo.png?v=297" w={237} />
            <UserInfo />
          </Flex>
        </AppShell.Header>

        <AppShell.Main >{children}</AppShell.Main>
      </AppShell>
    </>
  )
};
