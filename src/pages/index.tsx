import { AppShell } from '@/components/AppShell';
import { PageHeadMetadata } from '@/components/PageHeadMetadata';
import { VideoGrid } from '@/components/VideoGrid';
import { Welcomer } from '@/components/Welcomer';

const Home = () => {
  return (
    <>
      <PageHeadMetadata
        title="VidGrid | Watch multiple videos at once in your browser for free"
        description="Watch multiple videos at once in your browser for free"
      />
      <Welcomer />
      <AppShell>
        <VideoGrid />
      </AppShell>
    </>
  );
};

export default Home;
