import { Group, Image, Text, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import {
  Dropzone,
  DropzoneProps,
  FileRejection,
  FileWithPath,
  IMAGE_MIME_TYPE,
} from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

type Props = Partial<DropzoneProps> & {
  value: string;
  onChange: (value: string) => void;
  onUpload: (file: FileWithPath[]) => Promise<void>;
};

export const UploadImage: React.FC<Props> = ({ value, onUpload, onChange, ...props }) => {
  const [uploading, setUploading] = useState(false);

  const onDrop = async (files: FileWithPath[]) => {
    setUploading(true);
    onUpload(files).finally(() => {
      setUploading(false);
    });
  };

  const onReject = (fileRejections: FileRejection[]) => {
    const rejectedFile = fileRejections?.[0];

    if (!rejectedFile) {
      notifications.show({
        title: 'Upload error',
        message: 'Please try again',
        color: 'red',
      });
      return;
    }

    notifications.show({
      title: `Your ${rejectedFile.file.name} fail to upload`,
      message: `Reason: ${rejectedFile.errors.map((error) => error.message).join(', ')}`,
      color: 'red',
    });
  };

  return (
    <Dropzone
      onDrop={onDrop}
      onReject={onReject}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      {...props}
      multiple={false}
      loading={uploading}
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
            stroke={1.5}
          />
          <Image src={value} radius="md" />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
};
