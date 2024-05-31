import { Box, Center, Group, Image, InputWrapper, LoadingOverlay, Stack } from '@mantine/core';

import dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import { useGetOffer } from '@/services/offer';
import { countryOptions } from '@/share/consts';
import { formatCurrency } from '@/share/helpers/currency';

export const DetailPage = () => {
  const params = useParams<{ id: string }>();

  const { data, isLoading } = useGetOffer({ id: Number(params?.id) });

  const offer = data?.offer;

  if (!offer && !isLoading) {
    return <>Offer not found</>;
  }

  return (
    <>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: '#046af1', type: 'bars' }}
      />
      <Center>
        <Group>
          <Box>
            <Stack gap="md">
              <InputWrapper label="Company">
                <Box>{offer?.company.name ?? 'NA'}</Box>
              </InputWrapper>
              <InputWrapper label="Location">
                <Box>
                  {countryOptions.find((option) => option.value === offer?.location.country)
                    ?.label ?? 'NA'}
                </Box>
              </InputWrapper>
              <InputWrapper label="Total Package">
                <Box>{offer?.total_package ? formatCurrency(offer.total_package) : 'NA'}</Box>
              </InputWrapper>
              <InputWrapper label="Offer at">
                <Box>
                  {offer?.created_time
                    ? dayjs(offer.created_time * 1000).format('YYYY-MM-DD')
                    : 'NA'}
                </Box>
              </InputWrapper>
            </Stack>
          </Box>
          <Box>
            <Image src={offer?.image_url} w={500} />
          </Box>
        </Group>
      </Center>
    </>
  );
};
