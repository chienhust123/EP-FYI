import { Button, Image, Modal } from '@mantine/core';
import { useToggle } from '@mantine/hooks';

export const ViewOfferImage: React.FC<{ url: string }> = ({ url }) => {
  const [open, toggle] = useToggle();

  return (
    <>
      <Button variant="default" size="xs" onClick={() => toggle(true)}>
        View Offer Image
      </Button>
      <Modal opened={open} onClose={() => toggle(false)}>
        <Image src={url} width={500} height={500} />
      </Modal>
    </>
  );
};
