import { ChannelsContextProvider } from '@/contexts/useChannels';
import { ControlsContextProvider } from '@/contexts/useControls';
import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import posthog from 'posthog-js';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
      // Get current URL for rewritre
      const currentUrl = window.location.protocol + '//' + window.location.host;

      // Load posthog
      posthog.init('phc_9W4CGDF0Mv5LvxzD8akGij4uGG9ECBXSoUkfYG1j7DX', { api_host: `${currentUrl}/ingest` });
    }
  });

  return (
    <ControlsContextProvider>
      <ChannelsContextProvider>
        <ChakraProvider>
          <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=G-RYL4H4QV41`} />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-RYL4H4QV41');
              `,
            }}
          />
          <Component {...pageProps} />
        </ChakraProvider>
      </ChannelsContextProvider>
    </ControlsContextProvider>
  );
}
