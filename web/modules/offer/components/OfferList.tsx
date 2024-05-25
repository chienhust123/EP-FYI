import { Box, Flex, Group, Image, SimpleGrid, Text } from '@mantine/core';
import Marquee from 'react-fast-marquee';
import Link from 'next/link';
import { formatCurrency } from '@/share/helpers/currency';
import { Offer } from '@/services/offer';

type Props = {
  offerList: Offer[];
};

export const OfferList: React.FC<Props> = ({ offerList = [] }) => (
  <Flex h={100} w="70vw" align="center" justify="center">
    <Marquee pauseOnHover>
      <SimpleGrid cols={5} h={100} style={{ alignItems: 'center' }}>
        {offerList.map((item) => (
          <Box key={item.company?.id} style={{ cursor: 'pointer' }}>
            <Link href={`/offer/${item.id}`}>
              <Group wrap="nowrap">
                <Image w={40} h={40} src={item.company.profile_image_url} />
                <Text size="md">{formatCurrency(item.total_package)}</Text>
              </Group>
            </Link>
          </Box>
        ))}
      </SimpleGrid>
    </Marquee>
  </Flex>
);
