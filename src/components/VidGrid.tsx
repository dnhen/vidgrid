import { useControlsContext } from '@/contexts/useControls';
import { Grid } from '@chakra-ui/react';
import { VideoDisplay } from './VideoDisplay';

export const VidGrid = () => {
  const { gridSize, gridSizeMap } = useControlsContext();

  return (
    <Grid
      templateRows={`repeat(${gridSizeMap[gridSize].rows}, 1fr)`}
      templateColumns={`repeat(${gridSizeMap[gridSize].columns}, 1fr)`}
      w="full"
      h="full"
    >
      {Array(gridSize)
        .fill(0)
        .map((_, i) => (
          <VideoDisplay key={i} index={i} />
        ))}
    </Grid>
  );
};
