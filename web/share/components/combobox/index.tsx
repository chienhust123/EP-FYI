import { useState } from 'react';
import { Box, Select, SelectProps } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedValue } from '@mantine/hooks';

type OptionType = {
  label: string;
  value: string;
};

export type AsyncSearchProps = Omit<SelectProps, 'data'> & {
  onChange: (value: string) => void;
  asyncFn: (searchValue: string, offset: number, limit: number) => Promise<OptionType[]>;
};

export const AsyncSearch = (props: AsyncSearchProps): React.ReactElement => {
  const { asyncFn, ...restProps } = props;

  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(search, 1000);

  const { isFetching, data } = useQuery({
    queryKey: ['search', debouncedSearch],
    queryFn: () => asyncFn(search, 0, 50),
  });

  return (
    <Box>
      <Select
        searchValue={search}
        searchable
        {...restProps}
        onSearchChange={setSearch}
        data={isFetching ? [] : data}
        nothingFoundMessage="Nothing found"
      />
    </Box>
  );
};
