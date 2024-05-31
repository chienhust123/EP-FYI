import { Button } from '@mantine/core';
import React from 'react';
import { notifications } from '@mantine/notifications';
import { Offer, OfferStatus, useUpdateOffer } from '@/services/offer';

export const ApproveOfferButton: React.FC<{ offer: Offer; onApproved?: () => void }> = ({
  offer,
  onApproved,
}) => {
  const { mutateAsync, isPending } = useUpdateOffer();

  return (
    <>
      <Button
        size="xs"
        loading={isPending}
        onClick={() => {
          mutateAsync({
            id: offer.id,
            offer: { ...offer, status: OfferStatus.VALUE_APPROVED },
          }).then(() => {
            notifications.show({
              color: 'green',
              title: 'Approve offer successfully!',
              message: `Offer ${offer.id} has been successfully approved`,
            });

            onApproved?.();
          });
        }}
      >
        Approve
      </Button>
    </>
  );
};
