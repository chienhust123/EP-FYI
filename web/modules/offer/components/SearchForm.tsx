import { Button, Center, ComboboxItem, Select, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import * as R from 'ramda';
import countryCodes from 'country-codes-list';
import { AsyncSearch } from '@/share/components/combobox';
import { searchOffersByCompany } from '../services';

const countryOptions = R.uniqBy(
  (country) => country.value,
  countryCodes.all().map((country) => ({
    label: country.countryNameEn,
    value: country.countryCode,
  }))
);

export const SearchForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const companyId = searchParams.get('company_id');
  const locationId = searchParams.get('location_id');

  const form = useForm({
    initialValues: {
      company_id: companyId,
      location_id: locationId,
    },
  });

  return (
    <Center>
      <Stack>
        <form
          onSubmit={form.onSubmit((value) => {
            router.push({
              pathname: '/search',
              query: R.reject(R.isNil)({
                company_id: value.company_id,
                location_id: value.location_id,
              }),
            });
          })}
        >
          <AsyncSearch
            mb="md"
            label="Search by company"
            clearable
            placeholder="Search by company"
            asyncFn={searchOffersByCompany}
            {...form.getInputProps('company_id')}
            key={form.key('company_id')}
          />
          <Select
            mb="md"
            name="location_id"
            label="Search by location"
            placeholder="Search by location"
            searchable
            clearable
            {...form.getInputProps('location_id')}
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
            key={form.key('location_id')}
          />
          <Button type="submit">Search</Button>
        </form>
      </Stack>
    </Center>
  );
};
