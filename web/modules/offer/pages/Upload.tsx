import { Box, Button, Center, InputBase, InputWrapper, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import CurrencyInput from 'react-currency-input-field';
import { useMemo } from 'react';
import { DateTimePicker } from '@mantine/dates';
import { SearchByCountry } from '@/share/components/search-by-country';
import { getIntlByCountryCode } from '@/share/helpers/currency';
import { getOptionsByObj } from '@/share/helpers/options';
import { PositionLevelMap } from '@/share/consts';
import { UploadImage } from '@/share/components/upload-image';
import {
  createOfferImage,
  CreateOfferRequest,
  PositionLevel,
  useCreateOffer,
} from '@/services/offer';
import { uploadImageToPresignedUrl } from '@/share/services';

type FEFormValues = {
  company_name: string;
  country_code: string;
  total_package: number;
  offer_at: number;
  level: PositionLevel;
  offer_image: string;
};

const transformToBEFormat = (values: FEFormValues): CreateOfferRequest => {
  return {
    company: {
      name: values.company_name,
    },

    location: {
      country: values.country_code
    },
    position: Position;
    total_package: MonetaryValue;
    image_id: number;
  }
};

export const UploadPage = () => {
  const form = useForm();
  const { data, mutate, isPending } = useCreateOffer();

  const intlConfig = useMemo(() => {
    return getIntlByCountryCode(form.values.country_code);
  }, [form.values.country_code]);

  return (
    <Box>
      <Center>
        <form
          onSubmit={form.onSubmit((values) => {
            mutate(values);
          })}
        >
          <TextInput
            mb="md"
            required
            label="Company"
            placeholder="Input company"
            {...form.getInputProps('company_name')}
            key={form.key('company_name')}
          />
          <SearchByCountry
            mb="md"
            required
            {...form.getInputProps('country_code')}
            key={form.key('country_code')}
          />
          <InputBase
            mb="md"
            label="Package"
            required
            placeholder="Input offer package"
            component={CurrencyInput}
            value={form.getInputProps('total_package').value}
            onValueChange={(value) => form.getInputProps('total_package').onChange(value)}
            key={form.key('total_package')}
            intlConfig={intlConfig}
            disabled={!form.getInputProps('country_code').value}
          />
          <DateTimePicker
            mb="md"
            required
            label="Offered at"
            placeholder="Pick date"
            {...form.getInputProps('offer_at')}
            key={form.key('offer_at')}
          />
          <Select
            mb="md"
            required
            label="Level"
            placeholder="Select offer level"
            {...form.getInputProps('level')}
            key={form.key('level')}
            data={getOptionsByObj(PositionLevelMap)}
          />

          <InputWrapper
            mb="md"
            required
            label="Offer Image"
            error={form.getInputProps('offer_image').error}
          >
            <UploadImage
              value={form.getInputProps('offer_image').value}
              onChange={form.getInputProps('offer_image').onChange}
              onUpload={async (files) => {
                const firstFile = files[0];
                if (!firstFile) {
                  return;
                }
                const presignUrlData = await createOfferImage({});
                const presignUrl = presignUrlData.image.presign_put_url;
                await uploadImageToPresignedUrl(presignUrl, firstFile);

                const offerImageUrl = presignUrl.split('?')[0];
                form.getInputProps('offer_image').onChange(offerImageUrl);
              }}
            />
          </InputWrapper>

          <Button type="submit">Upload Offer</Button>
        </form>
      </Center>
    </Box>
  );
};
