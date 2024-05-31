import { ActionIcon, Box, Center, Group, LoadingOverlay, Space, Tabs } from '@mantine/core';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { IconEye } from '@tabler/icons-react';
import OfferTable from '../components/OfferTable';
import { Offer, OfferListFilterOptions, OfferStatus, useGetOfferList } from '@/services/offer';
import { RejectOfferButton } from '../components/RejectOfferButton';
import { ApproveOfferButton } from '../components/ApproveOfferButton';
import { ViewOfferImage } from '../components/ViewOfferImage';

enum TabType {
  Pending = 'pending',
  Approve = 'approve',
  Rejected = 'rejected',
}

const getOfferFilterOptions = (tab: string): OfferListFilterOptions => {
  switch (tab) {
    case TabType.Pending: {
      return {
        status_list: [OfferStatus.VALUE_UPLOADED],
      };
    }
    case TabType.Rejected: {
      return {
        status_list: [OfferStatus.VALUE_DISAPPROVED],
      };
    }
    case TabType.Approve: {
      return {
        status_list: [OfferStatus.VALUE_APPROVED],
      };
    }
  }

  return {};
};

export const Approve = () => {
  const params = useSearchParams();
  const router = useRouter();

  const tab = params.get('tab') ?? TabType.Pending;
  const offset = params.get('offset');
  const limit = params.get('limit');

  const { isFetching, data, refetch } = useGetOfferList({
    filter_options: getOfferFilterOptions(tab),
    offset: Number(offset) ?? 0,
    limit: Number(limit) ?? 20,
  });

  const offerList = data?.offer_list ?? [];
  const totalOffer = data?.total_offer_count ?? 0;

  return (
    <Box>
      <Box mt="lg">
        <Center pos="relative">
          <LoadingOverlay
            visible={isFetching}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: '#046af1', type: 'bars' }}
          />
          <Tabs
            defaultValue="gallery"
            value={tab}
            onChange={(value) => router.push(`/approve?tab=${value}&offset=0&limit=20`)}
          >
            <Tabs.List>
              <Tabs.Tab value={TabType.Pending}>Pending</Tabs.Tab>
              <Tabs.Tab value={TabType.Approve}>Approve</Tabs.Tab>
              <Tabs.Tab value={TabType.Rejected}>Rejected</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value={TabType.Pending}>
              <Space h="md" />
              <OfferTable
                total={totalOffer}
                offerList={offerList}
                renderActions={(offer: Offer) => (
                  <>
                    <Group>
                      <ApproveOfferButton offer={offer} onApproved={refetch} />
                      <RejectOfferButton offer={offer} onRejected={refetch} />
                      <ViewOfferImage url={offer.image_url} />
                    </Group>
                  </>
                )}
              />
            </Tabs.Panel>

            <Tabs.Panel value={TabType.Approve}>
              <Space h="md" />
              <OfferTable
                total={totalOffer}
                offerList={offerList}
                renderActions={(offer: Offer) => (
                  <>
                    <Group>
                      <RejectOfferButton offer={offer} onRejected={refetch} />
                      <ViewOfferImage url={offer.image_url} />

                      <Link href={`/offer/detail?id=${offer.id}`}>
                        <ActionIcon variant="outline">
                          <IconEye />
                        </ActionIcon>
                      </Link>
                    </Group>
                  </>
                )}
              />
            </Tabs.Panel>

            <Tabs.Panel value={TabType.Rejected}>
              <Space h="md" />
              <OfferTable
                total={totalOffer}
                offerList={offerList}
                renderActions={(offer: Offer) => (
                  <>
                    <Group>
                      <ApproveOfferButton offer={offer} onApproved={refetch} />
                      <ViewOfferImage url={offer.image_url} />

                      <Link href={`/offer/detail?id=${offer.id}`}>
                        <ActionIcon variant="outline">
                          <IconEye />
                        </ActionIcon>
                      </Link>
                    </Group>
                  </>
                )}
              />
            </Tabs.Panel>
          </Tabs>
        </Center>
      </Box>
    </Box>
  );
};
