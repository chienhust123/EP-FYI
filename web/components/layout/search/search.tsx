import { Flex, Input, Pill, Space } from '@mantine/core';
import { IconAdjustmentsHorizontal, IconArrowsSort, IconCalendarMonth, IconLocation, IconSearch, IconTicket } from '@tabler/icons-react';

export const Search = () => <div>
  <Input placeholder="Search" radius="xl" size="md" leftSection={<IconSearch />} />
  <Space h="md" />
  <Flex gap="md">
    <Pill size="lg">
      <Flex align="center" gap="xs">
        <IconCalendarMonth size={15} /> Date
      </Flex>
    </Pill>
    <Pill size="lg">
      <Flex align="center" gap="xs">
        <IconLocation size={15} /> Location
      </Flex>
    </Pill>
    <Pill size="lg">
      <Flex align="center" gap="xs">
        <IconTicket size={15} /> Promo & Deal
      </Flex>
    </Pill>
    <Pill size="lg">
      <Flex align="center" gap="xs">
        <IconAdjustmentsHorizontal size={15} /> More Filters
      </Flex>
    </Pill>
    <Pill size="lg">
      <Flex align="center" gap="xs">
        <IconArrowsSort size={15} /> Sort
      </Flex>
    </Pill>

  </Flex>
</div>;
