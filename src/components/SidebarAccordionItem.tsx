import { Channel } from '@/contexts/useChannels';
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Flex, Text } from '@chakra-ui/react';
import { ChannelItem } from './ChannelItem';

interface SidebarAccordionItemProps {
  title: string;
  innerData: Channel[];
}

export const SidebarAccordionItem = ({ title, innerData }: SidebarAccordionItemProps) => {
  return (
    <AccordionItem>
      <AccordionButton>
        <Flex flex="1" justifyContent="space-between" alignItems="center" gap="2">
          <Text color="#EEEEEC">{title}</Text>
          <Badge colorScheme="blue">{innerData.length}</Badge>
        </Flex>
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
