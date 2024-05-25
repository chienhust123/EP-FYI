import React from 'react';
import { Table, ActionIcon, Box, Pagination, Flex, Center, Stack } from '@mantine/core';
import Link from 'next/link';
import { IconEye } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { Offer } from '@/services/offer';
import { formatCurrency } from '@/share/helpers/currency';

type Props = {
  offerList: Offer[];
};

const OfferTable: React.FC<Props> = ({ offerList }) => {
  const rows = offerList.map((offer) => (
    <Table.Tr key={offer.id}>
      <Table.Td>{offer.company.name}</Table.Td>
      <Table.Td>{offer.location.city}</Table.Td>
      <Table.Td>{offer.position.title}</Table.Td>
      <Table.Td> {formatCurrency(offer.total_package)}</Table.Td>
      <Table.Td>
        {offer.created_time ? dayjs(offer.created_time * 1000).format('YYYY-MM-DD') : 'NA'}
      </Table.Td>
      <Table.Td>
        <Link href={`/offer/detail?id=${offer.id}`}>
          <ActionIcon variant="outline">
            <IconEye />
          </ActionIcon>
        </Link>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box w={1000}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Company</Table.Th>
            <Table.Th>Location</Table.Th>
            <Table.Th>Position</Table.Th>
            <Table.Th>Total Package</Table.Th>
            <Table.Th>Offered at</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.length ? (
            rows
          ) : (
            <Center>
              <Stack>No offers available</Stack>
            </Center>
          )}
        </Table.Tbody>
      </Table>
      <Flex mt="lg" justify="end">
        <Pagination total={10} />
      </Flex>
    </Box>
  );
};

export default OfferTable;
