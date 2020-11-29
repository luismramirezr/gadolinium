import React from 'react';
import { AppProps } from 'next/app';
import Theme from 'styles/Theme';
import Head from 'next/head';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import 'typeface-sen';

import { useStore } from 'store';

import Alerts from 'components/Alerts';

function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="apple-touch-icon" href="/favicon/logo192.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/logo32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/logo16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </Head>
      <Provider store={store}>
        <IntlProvider locale="en">
          <Theme>
            <SnackbarProvider maxSnack={5}>
              <Alerts />
              <Component {...pageProps} />
            </SnackbarProvider>
          </Theme>
        </IntlProvider>
      </Provider>
    </>
  );
}

export default App;
