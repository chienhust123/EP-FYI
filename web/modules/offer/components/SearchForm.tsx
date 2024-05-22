import { Button, Center, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import * as R from 'ramda';

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

  return <Center>
    <Stack>
      <form onSubmit={form.onSubmit((value) => {
        router.push({
          pathname: '/search',
          query: R.reject(R.isNil)({
            company_id: value.company_id,
            location_id: value.location_id,
          }),
        });
      })}>
        <TextInput mb="md" label="Search by company" placeholder="Search by company" {...form.getInputProps('company_id')} key={form.key('company_id')} />
        <TextInput mb="md" name="location_id" label="Search by location" placeholder="Search by location" {...form.getInputProps('location_id')} key={form.key('location_id')} />
        <Button type="submit">Search</Button>
      </form>
    </Stack>
  </Center>;
};
