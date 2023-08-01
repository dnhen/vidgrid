import { AppShell } from '@/components/AppShell';
import { PageHeadMetadata } from '@/components/PageHeadMetadata';
import { VidGrid } from '@/components/VidGrid';

const Home = () => {
  return (
    <>
      <PageHeadMetadata title="VidGrid" description="Play multiple videos at once" />
      <AppShell>
        <VidGrid />
      </AppShell>
    </>
  );
};

export default Home;
