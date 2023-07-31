import { ControlsAccordionItem } from '@/components/ControlsAccordionItem';
import { SidebarAccordionItem } from '@/components/SidebarAccordionItem';
import { AUS_TV_CHANNELS_DATA } from '@/constants/AusTvChannelsData';
import { Accordion, Flex, Text } from '@chakra-ui/react';

export const Sidebar = () => {
  return (
    <Flex flexDir="column" alignItems="center" p="2" w="200px" height="full" bg="#090C02" gap="4">
      <Text color="#EEEEEC" fontSize="2xl" fontWeight="bold">
        VidGrid
      </Text>
      <Accordion w="full" overflowY="auto" allowToggle>
        {AUS_TV_CHANNELS_DATA.map((channelGroup, i) => {
          return <SidebarAccordionItem key={i} title={channelGroup.category} innerData={channelGroup.channels} />;
        })}
        <ControlsAccordionItem />
      </Accordion>
    </Flex>
  );
};
