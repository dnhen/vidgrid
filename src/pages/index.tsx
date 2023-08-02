import { AppShell } from '@/components/AppShell';
import { PageHeadMetadata } from '@/components/PageHeadMetadata';
import { VideoGrid } from '@/components/VideoGrid';

const Home = () => {
  return (
    <>
      <PageHeadMetadata title="VidGrid" description="Play multiple videos at once" />
      <AppShell>
        <VideoGrid />
      </AppShell>
    </>
  );
};

export default Home;
