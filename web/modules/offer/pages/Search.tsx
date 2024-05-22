import { Box, Center, LoadingOverlay } from '@mantine/core';
import { useSearchParams } from 'next/navigation';

import * as R from 'ramda';
import React from 'react';
import { useGetOfferList } from '@/services/offer';
import { SearchForm } from '../components/SearchForm';
import { OfferList } from '../components/OfferList';
import OfferTable from '../components/OfferTable';

export const SearchPage: React.FC = () => {
  const searchParams = useSearchParams();

  const companyId = searchParams.get('company_id');
  const locationId = searchParams.get('location_id');

  const hasSearchSomething = !!companyId || !!locationId;

  const { isLoading, data: offerListData } = useGetOfferList({
    offset: 0,
    limit: 10,
    filter_options: {
      company_id_list: R.isEmpty(companyId) ? undefined : [Number(companyId)],
      country_list: R.isEmpty(locationId) ? undefined : [locationId ?? ''],
    },
  });

  return <Box>
    <SearchForm />
    <Box mt="lg">
      <Center>
        <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
        {
          !hasSearchSomething ?
            <OfferList offerList={offerListData?.offer_list ?? []} />
            :
            <OfferTable offerList={offerListData?.offer_list ?? []} />
        }
      </Center>
    </Box>
  </Box>;
};
