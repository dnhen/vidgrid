import { gridSizeMap } from '@/constants/Config';
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

export const ControlsAccordionItem = () => {
  const { gridSize, setGridSize } = useControlsContext();
  const possibleGridSizes = Object.keys(gridSizeMap).map((key) => parseInt(key));
  const [gridSizeIndex, setGridSizeIndex] = useState<number>(possibleGridSizes.findIndex((size) => size === gridSize));

  const handleGridSizeDecreaseClick = () => {
    const newIndex = gridSizeIndex - 1;

    setGridSizeIndex(newIndex);

    return setGridSize(possibleGridSizes[newIndex]);
  };

  const handleGridSizeIncreaseClick = () => {
    const newIndex = gridSizeIndex + 1;

    setGridSizeIndex(newIndex);

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
              Active Elements
            </Text>
            <Flex justifyContent="center" alignItems="center" w="full" gap="3" flexWrap="wrap">
              {Array(gridSize)
                .fill(0)
                .map((_, i) => (
                  <Button key={i} size="sm" colorScheme="whiteAlpha" variant="ghost" color="#EEEEEC">
                    {i + 1}
                  </Button>
                ))}
            </Flex>
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
