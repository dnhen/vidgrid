import { SidebarAccordionItem } from '@/components/SidebarAccordionItem';
import { AUS_TV_CHANNELS_DATA } from '@/constants/AusTvChannelsData';
import { Accordion, Flex, Text } from '@chakra-ui/react';

export const Sidebar = () => {
  return (
    <Flex
      flexDir="column"
      alignItems="center"
      p="2"
      resize="horizontal"
      width="15vw"
      height="full"
      overflow="auto"
      bg="#090C02"
      gap="4"
    >
      <Text color="#EEEEEC" fontSize="2xl" fontWeight="bold">
        VidGrid
      </Text>
      <Accordion w="full" allowToggle>
        {AUS_TV_CHANNELS_DATA.map((channelGroup, i) => {
          return <SidebarAccordionItem key={i} title={channelGroup.category} innerData={channelGroup.channels} />;
        })}
      </Accordion>
    </Flex>
  );
};
