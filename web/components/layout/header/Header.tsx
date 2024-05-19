import { Flex, Stack, Text } from '@mantine/core';
import { IconGridDots, IconShare, IconShoppingCart, IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import s from './s.module.scss';

const bottomList = [
  {
    title: 'One heath',
    link: '/',
    icon: <IconGridDots />,
  },
  {
    title: 'Community',
    link: '/community',
    icon: <IconShoppingCart />,
  },
  {
    title: 'Blog',
    link: '/blog',
    icon: <IconShare />,
  },
  {
    title: 'About us',
    link: '/about-us',
    icon: <IconUser />,
  },
];

export const Header = () => {
  const pathname = usePathname();
  return <Flex
    direction={{ base: 'row' }}
    gap={{ base: 'sm', sm: 'lg' }}
    justify="end"
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
            <Text p="sm" fw={item.link !== '/' && pathname.includes(item.link) ? 700 : undefined}>{item.title}</Text>
          </Link>
        </Stack>
      ))
    }
  </Flex>;
};
