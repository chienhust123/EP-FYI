import { Grid, Space, Title } from '@mantine/core';
import '@mantine/carousel/styles.css';
import Link from 'next/link';

export interface SectionProps<ItemType extends Record<string, any>> {
  title: string;
  items: ItemType[];
  titleUrl: string;
  renderItem: (item: ItemType, index: number) => React.ReactElement
}

// eslint-disable-next-line max-len
export const Section = <ItemType extends Record<string, any>>({ title, titleUrl, items = [], renderItem }: SectionProps<ItemType>) => <section>
  <Title order={2} size="20">
    <Link href={titleUrl}>
      {title}
    </Link>
  </Title>

  <Space h="md" />
  <Grid>
    {
      items.map((item, index) => <Grid.Col key={index} span={6}>{
        renderItem(item, index)
      }</Grid.Col>)
    }
  </Grid>

</section>;
