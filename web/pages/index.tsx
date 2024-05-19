import { offerCoreServiceGetAggregatedCompanyStatsList } from '@/services/offer';
import { Box, Flex, Group, Image, LoadingOverlay, SimpleGrid, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

export default function HomePage() {
  const { isFetching, data } = useQuery({
    queryKey: ['company', 'list'],
    queryFn: () => offerCoreServiceGetAggregatedCompanyStatsList({ limit: '10' }),
  })

  return (
    <div >
      <LoadingOverlay
        visible={isFetching}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: '#046af1', type: 'bars' }}
      />
      <Flex h={500} align={'center'} justify={'center'}>
        <SimpleGrid cols={3} h={500} w={500} style={{ 'alignItems': 'center' }}>
          {
            data?.companyStatList?.map(item => (
              <Box key={item.company?.id}>
                <Group wrap='nowrap'>
                  <Image w={40} h={40} src={item.company?.profileImageUrl} />
                  <Text color='#1ba68d' fw='bold' size='lg'>
                    {item.totalSubmissionCount} Offers
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
