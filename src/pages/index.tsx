import { AppShell } from '@/components/AppShell';
import { PageHeadMetadata } from '@/components/PageHeadMetadata';

const Home = () => {
  return (
    <>
      <PageHeadMetadata title="VidGrid" description="Play multiple videos at once" />
      <AppShell>Inside app</AppShell>
    </>
  );
};

export default Home;
