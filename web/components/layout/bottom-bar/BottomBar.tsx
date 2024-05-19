import { Flex, Stack, Text } from '@mantine/core';
import { IconGridDots, IconShare, IconShoppingCart, IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import s from './s.module.scss';

const bottomList = [
  {
    title: 'Reservation',
    link: '/reservation',
    icon: <IconGridDots />,
  },
  {
    title: 'Shopping',
    link: '/shopping',
    icon: <IconShoppingCart />,
  },
  {
    title: 'Community',
    link: '/community',
    icon: <IconShare />,
  },
  {
    title: 'Account',
    link: '/profile',
    icon: <IconUser />,
  },
];

export const BottomBar = () => {
  const pathname = usePathname();
  return <Flex
    direction="column"
    gap={{ base: 'sm', sm: 'lg' }}
    justify="space-around"
    className={s.bottomBar}
  >
    {
      bottomList.map(item => (
        <Stack
          h={66}
          key={item.title}
          align="stretch"
          justify="center"
          gap="md"

        >
          <Link
            style={{
              height: 66,
            }}
            href={item.link}>
            <Flex
              style={{ height: 66 }
              }
              align="center"
              justify="center"
              direction="column">
              {item.icon}
              <Text fw={pathname.includes(item.link) ? 700 : undefined}>{item.title}</Text>
            </Flex>
          </Link>
        </Stack>
      ))
    }
  </Flex>;
};
