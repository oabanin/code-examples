import { useState } from 'react';

import CheckToken from 'src/modules/layout/components/CheckToken/CheckToken';
import Layout from 'src/modules/layout/components/Layout/Layout';

import store from 'src/store/store';

import 'src/styles/globals.scss';

import { NextIntlProvider } from 'next-intl';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { AppContext } from 'src/context/context';

const Snackbar = dynamic(
  () => import(/* webpackPreload: true */ 'src/components/Snackbar/Snackbar'),
  {
    ssr: false,
  },
);

function MyApp({ Component, pageProps }) {
  const { locale } = useRouter();
  const [snackBarText, setSnackBarText] = useState('');

  return (
    <NextIntlProvider locale={locale || 'en'} messages={pageProps.messages}>
      <Provider store={store}>
        {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
        <AppContext.Provider value={{ setSnackBarText }}>
          <CheckToken />
          <Layout>
            <Component {...pageProps} />
          </Layout>
          {Boolean(snackBarText) && (
            <Snackbar snackBarText={snackBarText} setSnackBarText={setSnackBarText} />
          )}
        </AppContext.Provider>
      </Provider>
    </NextIntlProvider>
  );
}

export default MyApp;
