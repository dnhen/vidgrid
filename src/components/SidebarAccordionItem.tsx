import { Channel } from '@/constants/AusTvChannelsData';
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';

interface SidebarAccordionItemProps {
  title: string;
  innerData: Channel[];
}

export const SidebarAccordionItem = ({ title, innerData }: SidebarAccordionItemProps) => {
  return (
    <AccordionItem>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left" color="#EEEEEC">
          {title}
        </Box>
        <AccordionIcon color="#EEEEEC" />
      </AccordionButton>
      <AccordionPanel pb={4} color="#EEEEEC">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </AccordionPanel>
    </AccordionItem>
  );
};
