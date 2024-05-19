/* eslint-disable @next/next/no-img-element */

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './global.scss';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import { Layout } from '@/components/layout';
import { AuthContext } from '../components/_context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <AuthContext>
        <Head>
          <title>Health App</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
          <link rel="shortcut icon" href="/favicon.svg" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContext>
    </MantineProvider>

  );
}
