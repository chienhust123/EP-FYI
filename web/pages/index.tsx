import { Box, Flex, Group, Image, LoadingOverlay, SimpleGrid, Text } from '@mantine/core';
import Marquee from 'react-fast-marquee';
import Link from 'next/link';
import { useGetAggregatedCompanyStatsList } from '@/services/offer';

export default function HomePage() {
  const { isLoading, data } = useGetAggregatedCompanyStatsList({ limit: 10 });

  return (
    <div>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: '#046af1', type: 'bars' }}
      />
      <Flex h="calc(100vh - 100px)" align="center" justify="center">
        <Box w="80%">
          <Marquee pauseOnHover>
            <Group gap="xl">
              {data?.company_stat_list?.map((item) => (
                <Box key={item.company?.id}>
                  <Link href={`/search?company_id=${item.company.id}`}>
                    <Group wrap="nowrap">
                      <Image w={40} h={40} src={item.company?.profile_image_url} />
                      <Text color="#1ba68d" fw="bold" size="xl">
                        {item.total_submission_count} Offers
                      </Text>
                    </Group>
                  </Link>
                </Box>
              ))}
            </Group>
          </Marquee>
        </Box>
      </Flex>
    </div>
  );
}
