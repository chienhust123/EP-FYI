import { Button, Center, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import * as R from 'ramda';
import { AsyncSearch } from '@/share/components/combobox';
import { searchOffersByCompany } from '../services';
import { SearchByCountry } from '@/share/components/search-by-country';

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
              pathname: '/offer/list',
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
          <SearchByCountry
            mb="md"
            {...form.getInputProps('location_id')}
            key={form.key('location_id')}
          />
          <Button type="submit">Search</Button>
        </form>
      </Stack>
    </Center>
  );
};
