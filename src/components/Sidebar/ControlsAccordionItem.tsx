import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Text } from '@chakra-ui/react';
import { ActiveVideoController } from './ActiveVideoController';

export const ControlsAccordionItem = () => {
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
            <ActiveVideoController />
          </Flex>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};
