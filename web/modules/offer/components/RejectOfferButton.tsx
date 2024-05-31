import { Box, Button } from '@mantine/core';
import React from 'react';
import { notifications } from '@mantine/notifications';
import { Offer, OfferStatus, useUpdateOffer } from '@/services/offer';

export const RejectOfferButton: React.FC<{ offer: Offer; onRejected?: () => void }> = ({
  offer,
  onRejected,
}) => {
  const { mutateAsync, isPending } = useUpdateOffer();

  return (
    <Box pos="relative">
      <Button
        variant="outline"
        size="xs"
        loading={isPending}
        color="red"
        onClick={() => {
          mutateAsync({
            id: offer.id,
            offer: { ...offer, status: OfferStatus.VALUE_DISAPPROVED },
          }).then(() => {
            notifications.show({
              color: 'green',
              title: 'Disapprove offer successfully!',
              message: `Offer ${offer.id} has been disapprove`,
            });

            onRejected?.();
          });
        }}
      >
        Reject
      </Button>
    </Box>
  );
};
