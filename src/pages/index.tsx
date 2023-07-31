import { AppShell } from '@/components/AppShell';
import { PageHeadMetadata } from '@/components/PageHeadMetadata';
import { VideoDisplay } from '@/components/VideoDisplay';
import { useControlsContext } from '@/contexts/useControls';
import { Grid } from '@chakra-ui/react';

const Home = () => {
  const { gridSize, gridSizeMap } = useControlsContext();

  return (
    <>
      <PageHeadMetadata title="VidGrid" description="Play multiple videos at once" />
      <AppShell>
        <Grid templateColumns={`repeat(${gridSizeMap[gridSize]}, 1fr)`} w="full" h="full">
          {Array(gridSize)
            .fill(0)
            .map((_, i) => (
              <VideoDisplay key={i} index={i} />
            ))}
        </Grid>
      </AppShell>
    </>
  );
};

export default Home;
