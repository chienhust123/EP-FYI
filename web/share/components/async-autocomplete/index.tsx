import { Autocomplete, AutocompleteProps } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState } from 'react';

export type AsyncAutoCompleteProps = AutocompleteProps & {
  asyncFn: (keyword: string) => Promise<string[]>;
};

export const AsyncAutoComplete: React.FC<AsyncAutoCompleteProps> = ({
  value,
  asyncFn,
  ...props
}) => {
  const [options, setOptions] = useState<string[]>([]);

  const [debouncedValue] = useDebouncedValue(value, 100);

  useEffect(() => {
    if (debouncedValue) {
      asyncFn(debouncedValue).then(setOptions);
    }
  }, [debouncedValue]);

  return <Autocomplete {...props} value={value} data={options} />;
};
