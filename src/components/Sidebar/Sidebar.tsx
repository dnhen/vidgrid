import { ControlsAccordionItem } from '@/components/Sidebar/ControlsAccordionItem';
import { SidebarAccordionItem } from '@/components/Sidebar/SidebarAccordionItem';
import { useChannelsContext } from '@/contexts/useChannels';
import { Accordion, Flex, Text } from '@chakra-ui/react';
import { SettingsAccordionItem } from './SettingsAccordionItem';

export const Sidebar = () => {
  const { channels } = useChannelsContext();

  return (
    <Flex flexDir="column" alignItems="center" p="2" w="200px" height="full" bg="#090C02" gap="4">
      <Text color="#EEEEEC" fontSize="2xl" fontWeight="bold">
        VidGrid
      </Text>
      <Accordion w="full" overflowY="auto" allowToggle>
        {channels.map((channelGroup, i) => {
          return <SidebarAccordionItem key={i} title={channelGroup.category} innerData={channelGroup.channels} />;
        })}
        <ControlsAccordionItem />
        <SettingsAccordionItem />
      </Accordion>
    </Flex>
  );
};
