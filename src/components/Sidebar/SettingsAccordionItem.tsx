import { useChannelsContext } from '@/contexts/useChannels';
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
  IconButton,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

export const SettingsAccordionItem = () => {
  const { clearChannels, getAusTvChannels } = useChannelsContext();
  const { gridSize, setGridSize, gridSizeMap } = useControlsContext();
  const possibleGridSizes = Object.keys(gridSizeMap).map((key) => parseInt(key));
  const [gridSizeIndex, setGridSizeIndex] = useState<number>(possibleGridSizes.findIndex((size) => size === gridSize));

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

  const handleAddCategory = () => {
    return;
  };

  const handleAddChannel = () => {
    return;
  };

  const handleEditCategories = () => {
    return;
  };

  const handleEditChannels = () => {
    return;
  };

  return (
    <AccordionItem>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left" fontWeight="bold" color="#EEEEEC">
          Settings
        </Box>
        <AccordionIcon color="#EEEEEC" />
      </AccordionButton>
      <AccordionPanel pb={4} color="#EEEEEC">
        <Flex flexDir="column" w="full" gap="2">
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
          <Divider color="#EEEEEC" />
          <Flex flexDir="column" justifyContent="center" alignItems="center" gap="1" py="1">
            <Text fontSize="sm" fontWeight="semibold">
              Saved Channels
            </Text>
            <Button size="xs" onClick={handleAddCategory} colorScheme="whiteAlpha" variant="solid" color="#EEEEEC">
              Add Category
            </Button>
            <Button size="xs" onClick={handleAddChannel} colorScheme="whiteAlpha" variant="solid" color="#EEEEEC">
              Add Channel
            </Button>
            <Button size="xs" onClick={handleEditCategories} colorScheme="whiteAlpha" variant="solid" color="#EEEEEC">
              Edit Categories
            </Button>
            <Button size="xs" onClick={handleEditChannels} colorScheme="whiteAlpha" variant="solid" color="#EEEEEC">
              Edit Channels
            </Button>
            <Button size="xs" onClick={clearChannels} colorScheme="whiteAlpha" variant="solid" color="#EEEEEC">
              Clear Channels
            </Button>
          </Flex>
          <Divider color="#EEEEEC" />
          <Flex flexDir="column" justifyContent="center" alignItems="center" gap="1" py="1">
            <Text fontSize="sm" fontWeight="semibold">
              Intl Channels
            </Text>
            <Button size="xs" onClick={getAusTvChannels} colorScheme="whiteAlpha" variant="solid" color="#EEEEEC">
              Get Australian Channels
            </Button>
          </Flex>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};
