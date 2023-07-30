import { Channel } from '@/constants/AusTvChannelsData';
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
import { ChannelItem } from './ChannelItem';

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
        {innerData.map((channel, i) => {
          return <ChannelItem key={i} name={channel.name} location={channel.location} url={channel.url} />;
        })}
      </AccordionPanel>
    </AccordionItem>
  );
};
