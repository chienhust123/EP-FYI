import { ComboboxItem, Select, SelectProps } from '@mantine/core';
import { countryOptions } from '@/share/consts';

export const SearchByCountry: React.FC<
  SelectProps & {
    value?: string;
    onChange?: (val: string | null) => void;
  }
> = (props) => {
  return (
    <Select
      name="location_id"
      label="Search by location"
      placeholder="Search by location"
      searchable
      clearable
      data={countryOptions}
      filter={({ options, search }) => {
        const splittedSearch = search.toLowerCase().trim().split(' ');
        return (options as ComboboxItem[]).filter((option) => {
          const words = option.label.toLowerCase().trim().split(' ');
          return splittedSearch.every((searchWord) =>
            words.some((word) => word.includes(searchWord))
          );
        });
      }}
      {...props}
    />
  );
};
