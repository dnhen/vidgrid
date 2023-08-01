import { ControlsAccordionItem } from '@/components/Sidebar/ControlsAccordionItem';
import { SidebarAccordionItem } from '@/components/Sidebar/SidebarAccordionItem';
import { useChannelsContext } from '@/contexts/useChannels';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Accordion, Divider, Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { ActiveVideoController } from './ActiveVideoController';
import { SettingsAccordionItem } from './SettingsAccordionItem';

export const Sidebar = () => {
  const { channels } = useChannelsContext();
  const [minimized, setMinimized] = useState<boolean>(false);

  return (
    <Flex
      flexDir="column"
      alignItems="center"
      p="2"
      w={minimized ? 'min(10%, 50px)' : 'min(40%, 250px)'}
      height="full"
      bg="#090C02"
      gap="4"
      transition="width 1s"
    >
      <Flex flexDir={minimized ? 'column' : 'row'} justifyContent="center" alignItems="center" gap="2">
        <Text color="#EEEEEC" fontSize={minimized ? 'lg' : '2xl'} fontWeight="bold">
          {minimized ? 'VG' : 'VidGrid'}
        </Text>
        <IconButton
          size="xs"
          aria-label="minimize/maximize"
          icon={minimized ? <Icon as={ChevronRightIcon} /> : <Icon as={ChevronLeftIcon} />}
          onClick={() => setMinimized(!minimized)}
          variant="solid"
          colorScheme="red"
        />
      </Flex>

      {/* If not minimized, show accordion buttons */}
      {!minimized && (
        <Accordion w="full" overflowY="auto" allowToggle>
          {Object.keys(channels).map((key, i) => {
            return <SidebarAccordionItem key={i} title={key} innerData={channels[key]} />;
          })}
          <ControlsAccordionItem />
          <SettingsAccordionItem />
        </Accordion>
      )}

      {/* If minimized, show active video controller buttons */}
      {minimized && (
        <>
          <Divider color="#EEEEEC" />
          <ActiveVideoController minimized={minimized} />
        </>
      )}
    </Flex>
  );
};
