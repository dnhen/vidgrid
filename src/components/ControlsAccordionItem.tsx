import { useControlsContext } from '@/contexts/useControls';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

export const ControlsAccordionItem = () => {
  const { gridSize, setGridSize, isVideoActive, addActiveVideo, removeActiveVideo, gridSizeMap } = useControlsContext();
  const possibleGridSizes = Object.keys(gridSizeMap).map((key) => parseInt(key));
  const [gridSizeIndex, setGridSizeIndex] = useState<number>(possibleGridSizes.findIndex((size) => size === gridSize));

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

  const handleGridSizeDecreaseClick = () => {
    // Get new index
    const newIndex = gridSizeIndex - 1;

    // Set the new grid size index (array ref) to the new Index
    setGridSizeIndex(newIndex);

    // Set the grid size to the new grid size
    return setGridSize(possibleGridSizes[newIndex]);
  };

  const handleGridSizeIncreaseClick = () => {
    // Get new index
    const newIndex = gridSizeIndex + 1;

    // Set the new grid size index (array ref) to the new Index
    setGridSizeIndex(newIndex);

    // Set the grid size to the new grid size
    return setGridSize(possibleGridSizes[newIndex]);
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
            <Grid templateColumns={`repeat(${gridSizeMap[gridSize]}, 1fr)`} w="full" h="full">
              {Array(gridSize)
                .fill(0)
                .map((_, i) => (
                  <Button
                    key={i}
                    size="sm"
                    colorScheme="whiteAlpha"
                    variant="ghost"
                    color="#EEEEEC"
                    borderWidth={isVideoActive(i) ? '1px' : '0px'}
                    borderColor="red"
                    onClick={() => handleActiveVideoClick(i)}
                  >
                    {i + 1}
                  </Button>
                ))}
            </Grid>
          </Flex>
          <Divider color="#EEEEEC" />
          <Flex flexDir="column" justifyContent="center" alignItems="center" gap="1" py="1">
            <Text fontSize="sm" fontWeight="semibold">
              Grid Size
            </Text>
            <Flex justifyContent="space-between" alignItems="center" w="full" gap="1">
              <IconButton
                aria-label="Decrease"
                icon={<MinusIcon />}
                size="xs"
                colorScheme="whiteAlpha"
                variant="ghost"
                color="#EEEEEC"
                isDisabled={gridSizeIndex - 1 < 0}
                onClick={handleGridSizeDecreaseClick}
              />
              <Text color="#EEEEEC">{gridSize}</Text>
              <IconButton
                aria-label="Increase"
                icon={<AddIcon />}
                size="xs"
                colorScheme="whiteAlpha"
                variant="ghost"
                color="#EEEEEC"
                isDisabled={gridSizeIndex + 1 > possibleGridSizes.length - 1}
                onClick={handleGridSizeIncreaseClick}
              />
            </Flex>
          </Flex>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};
