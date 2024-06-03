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
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AddCategoryModal } from './AddCategoryModal';
import { AddChannelModal } from './AddChannelModal';
import { DeleteCategoryModal } from './DeleteCategoryModal';
import { DeleteChannelModal } from './DeleteChannelModal';

export const SettingsAccordionItem = () => {
  const { isOpen: isOpenAddCategory, onOpen: onOpenAddCategory, onClose: onCloseAddCategory } = useDisclosure();
  const {
    isOpen: isOpenDeleteCategory,
    onOpen: onOpenDeleteCategory,
    onClose: onCloseDeleteCategory,
  } = useDisclosure();
  const { isOpen: isOpenAddChannel, onOpen: onOpenAddChannel, onClose: onCloseAddChannel } = useDisclosure();
  const { isOpen: isOpenDeleteChannel, onOpen: onOpenDeleteChannel, onClose: onCloseDeleteChannel } = useDisclosure();
  const { clearChannels, getMasterChannels, getAusTvChannels } = useChannelsContext();
  const { gridSize, setGridSize, gridSizeMap } = useControlsContext();
  const possibleGridSizes = Object.keys(gridSizeMap).map((key) => parseInt(key));
  const [gridSizeIndex, setGridSizeIndex] = useState<number>(possibleGridSizes.findIndex((size) => size === gridSize));

  // Update grid size index when grid size changes
  useEffect(() => {
    setGridSizeIndex(possibleGridSizes.findIndex((size) => size === gridSize));
  }, [gridSize]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleGridSizeDecreaseClick = () => {
    // Get new index
    const newIndex = gridSizeIndex - 1;

    // Set the grid size to the new grid size
    return setGridSize(possibleGridSizes[newIndex]);
  };

  const handleGridSizeIncreaseClick = () => {
    // Get new index
    const newIndex = gridSizeIndex + 1;

    // Set the grid size to the new grid size
    return setGridSize(possibleGridSizes[newIndex]);
  };

  return (
    <>
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
              <Button size="xs" onClick={onOpenAddCategory} colorScheme="whiteAlpha" variant="solid" color="#EEEEEC">
                Add Category
              </Button>
              <Button size="xs" onClick={onOpenDeleteCategory} colorScheme="whiteAlpha" variant="solid" color="#EEEEEC">
                Delete Category
              </Button>
              <Button size="xs" onClick={onOpenAddChannel} colorScheme="whiteAlpha" variant="solid" color="#EEEEEC">
                Add Channel
              </Button>
              <Button size="xs" onClick={onOpenDeleteChannel} colorScheme="whiteAlpha" variant="solid" color="#EEEEEC">
                Delete Channel
              </Button>
              <Button size="xs" onClick={clearChannels} colorScheme="whiteAlpha" variant="solid" color="#EEEEEC">
                Clear Channels
              </Button>
            </Flex>
            <Divider color="#EEEEEC" />
            <Flex flexDir="column" justifyContent="center" alignItems="center" gap="1" py="1">
              <Text fontSize="sm" fontWeight="semibold">
                Pre-Configured Channels
              </Text>
              <Button size="xs" onClick={getMasterChannels} colorScheme="whiteAlpha" variant="solid" color="#EEEEEC">
                Get Master Channels
              </Button>
              <Button size="xs" onClick={getAusTvChannels} colorScheme="whiteAlpha" variant="solid" color="#EEEEEC">
                Get Australian Channels
              </Button>
            </Flex>
          </Flex>
        </AccordionPanel>
      </AccordionItem>
      <AddCategoryModal isOpen={isOpenAddCategory} onClose={onCloseAddCategory} />
      <DeleteCategoryModal isOpen={isOpenDeleteCategory} onClose={onCloseDeleteCategory} />
      <AddChannelModal isOpen={isOpenAddChannel} onClose={onCloseAddChannel} />
      <DeleteChannelModal isOpen={isOpenDeleteChannel} onClose={onCloseDeleteChannel} />
    </>
  );
};
