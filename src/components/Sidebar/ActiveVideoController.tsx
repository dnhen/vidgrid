import { useControlsContext } from '@/contexts/useControls';
import { Button, Grid, GridItem } from '@chakra-ui/react';

interface ActiveVideoControllerProps {
  minimized?: boolean;
}

export const ActiveVideoController = ({ minimized = false }: ActiveVideoControllerProps) => {
  const { gridSize, isVideoActive, addActiveVideo, removeActiveVideo, gridSizeMap } = useControlsContext();

  const handleActiveVideoClick = (i: number) => {
    if (!isVideoActive(i)) {
      // Add video to active videos
      addActiveVideo(i);
    } else {
      // Remove video from active videos
      removeActiveVideo(i);
    }

    return;
  };

  const templateRowSize = minimized
    ? `repeat(${gridSizeMap[gridSize].elements.length}, 1fr)`
    : `repeat(${gridSizeMap[gridSize].rows}, 1fr)`;

  const templateColumnSize = minimized ? 'repeat(1, 1fr)' : `repeat(${gridSizeMap[gridSize].columns}, 1fr)`;

  return (
    <Grid
      templateRows={templateRowSize}
      templateColumns={templateColumnSize}
      w="full"
      h={minimized ? '60%' : 'full'}
      gap="1"
    >
      {Array(gridSize)
        .fill(0)
        .map((_, i) => {
          const gridRowStart = minimized ? i + 1 : gridSizeMap[gridSize].elements[i].rowStart;
          const gridRowEnd = minimized ? 'span 1' : gridSizeMap[gridSize].elements[i].rowEnd;
          const gridColumnStart = minimized ? '1' : gridSizeMap[gridSize].elements[i].colStart;
          const gridColumnEnd = minimized ? '1' : gridSizeMap[gridSize].elements[i].colEnd;

          return (
            <GridItem
              key={i}
              w="full"
              h="full"
              gridRowStart={gridRowStart}
              gridRowEnd={gridRowEnd}
              gridColumnStart={gridColumnStart}
              gridColumnEnd={gridColumnEnd}
            >
              <Button
                size={minimized ? 'xs' : 'sm'}
                colorScheme="whiteAlpha"
                variant="ghost"
                color="#EEEEEC"
                borderWidth={isVideoActive(i) ? '1px' : '0px'}
                borderColor="red"
                onClick={() => handleActiveVideoClick(i)}
                w="full"
                h="full"
              >
                {i + 1}
              </Button>
            </GridItem>
          );
        })}
    </Grid>
  );
};
