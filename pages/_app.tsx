import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/layout';
import { NextComponentType } from 'next';
import { SessionProvider } from 'next-auth/react';

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean };
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
