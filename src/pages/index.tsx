import { AppShell } from '@/components/AppShell';
import { PageHeadMetadata } from '@/components/PageHeadMetadata';
import { VideoDisplay } from '@/components/VideoDisplay';
import { Grid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const Home = () => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setUrl('https://npc.cdn.7livecloud.io/hls/live/SYD1/masterSD.m3u8');
    }, 1000);
  }, []);

  return (
    <>
      <PageHeadMetadata title="VidGrid" description="Play multiple videos at once" />
      <AppShell>
        <Grid templateColumns="repeat(2, 1fr)" w="full" h="full">
          <VideoDisplay url={url} />
        </Grid>
      </AppShell>
    </>
  );
};

export default Home;
