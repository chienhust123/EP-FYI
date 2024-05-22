import { useGetAggregatedCompanyStatsList } from '@/services/offer';
import { Box, Flex, Group, Image, LoadingOverlay, SimpleGrid, Text } from '@mantine/core';

export default function HomePage() {
  const { isLoading, data } = useGetAggregatedCompanyStatsList({ limit: 10 });

  return (
    <div >
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: '#046af1', type: 'bars' }}
      />
      <Flex h={500} align={'center'} justify={'center'}>
        <SimpleGrid cols={3} h={500} w={500} style={{ 'alignItems': 'center' }}>
          {
            data?.company_stat_list?.map(item => (
              <Box key={item.company?.id}>
                <Group wrap='nowrap'>
                  <Image w={40} h={40} src={item.company?.profile_image_url} />
                  <Text color='#1ba68d' fw='bold' size='lg'>
                    {item.total_submission_count} Offers
                  </Text>
                </Group>

              </Box>
            ))
          }
        </SimpleGrid>
      </Flex>
    </div>
  );
}
