import { Button, Group, Space, Stack, Text } from '@mantine/core';
import { useRouter } from 'next/router';

export default function HomePage() {
  const router = useRouter();
  return (
    <>
      <Stack h="80vh" justify="center" align="center">
        <Text fw={700} h={1}>ONE HEALTH</Text>
        <Space h="md" />
        <Text w={300} fs="italic" ta="center">“better experience,
          better health, better wellness”</Text>
        <Space h="md" />
        <Text w={300} ta="center">a health and wellness platform provides curated experience for people </Text>
        <Space h="md" />
        <Group>
          <Button w="95" display="inline-block" bg="#3F51B5" onClick={() => router.push('/reservation')}>
            Visit
          </Button>
          <Button w="95" display="inline-block" bg="#FF9800" onClick={() => router.push('/login')}>
            Log in
          </Button>
        </Group>
      </Stack>
    </>
  );
}
