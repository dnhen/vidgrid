import { AppShell } from '@/components/AppShell';
import { PageHeadMetadata } from '@/components/PageHeadMetadata';
import { VideoGrid } from '@/components/VideoGrid';
import { Welcomer } from '@/components/Welcomer';

const Home = () => {
  return (
    <>
      <PageHeadMetadata title="VidGrid" description="Play multiple videos at once" />
      <Welcomer />
      <AppShell>
        <VideoGrid />
      </AppShell>
    </>
  );
};

export default Home;
