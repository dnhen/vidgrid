import { ChannelsContextProvider } from '@/contexts/useChannels';
import { ControlsContextProvider } from '@/contexts/useControls';
import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ControlsContextProvider>
      <ChannelsContextProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </ChannelsContextProvider>
    </ControlsContextProvider>
  );
}
