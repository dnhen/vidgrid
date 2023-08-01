import { useControlsContext } from '@/contexts/useControls';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react';

export const ControlsAccordionItem = () => {
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

  return (
    <AccordionItem>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left" fontWeight="bold" color="#EEEEEC">
          Controls
        </Box>
        <AccordionIcon color="#EEEEEC" />
      </AccordionButton>
      <AccordionPanel pb={4} color="#EEEEEC">
        <Flex flexDir="column" w="full" gap="2">
          <Flex flexDir="column" justifyContent="center" alignItems="center" gap="1" py="1">
            <Text fontSize="sm" fontWeight="semibold">
              Active Videos
            </Text>
            <Grid
              templateRows={`repeat(${gridSizeMap[gridSize].rows}, 1fr)`}
              templateColumns={`repeat(${gridSizeMap[gridSize].columns}, 1fr)`}
              w="full"
              h="full"
              gap="1"
            >
              {Array(gridSize)
                .fill(0)
                .map((_, i) => (
                  <GridItem
                    key={i}
                    w="full"
                    h="full"
                    gridRowStart={gridSizeMap[gridSize].elements[i].rowStart}
                    gridRowEnd={gridSizeMap[gridSize].elements[i].rowEnd}
                    gridColumnStart={gridSizeMap[gridSize].elements[i].colStart}
                    gridColumnEnd={gridSizeMap[gridSize].elements[i].colEnd}
                  >
                    <Button
                      size="sm"
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
                ))}
            </Grid>
          </Flex>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};