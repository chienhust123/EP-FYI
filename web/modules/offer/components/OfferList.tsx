import { Box, Flex, Group, Image, SimpleGrid, Text } from '@mantine/core';
import { formatCurrency } from '@/share/helpers/currency';
import { Offer } from '@/services/offer';

type Props = {
  offerList: Offer[];
};

export const OfferList: React.FC<Props> = ({ offerList = [] }) => (
  <Flex h={100} align="center" justify="center">
    <SimpleGrid cols={5} h={500} w={1000} style={{ alignItems: 'center' }}>
      {offerList.map((item) => (
        <Box key={item.company?.id}>
          <Group wrap="nowrap">
            <Image w={40} h={40} src={item.company.profile_image_url} />
            <Text size="md">{formatCurrency(item.total_package)}</Text>
          </Group>
        </Box>
      ))}
    </SimpleGrid>
  </Flex>
);
