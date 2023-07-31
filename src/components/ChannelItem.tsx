import { Flex, Text } from '@chakra-ui/react';
import { DragEvent } from 'react';

interface ChannelItemProps {
  name: string;
  location: string;
  url: string;
}

export const ChannelItem = ({ name, location, url }: ChannelItemProps) => {
  const handleDragStart = (e: DragEvent) => {
    // Set the data to be transferred
    e.dataTransfer.setData('videoUrl', url);
    e.dataTransfer.setData('videoName', `${name} - ${location}`);

    return;
  };

  return (
    <Flex
      alignItems="center"
      my="1"
      py="0.5"
      px="1"
      _hover={{ backgroundColor: 'gray.700', cursor: 'pointer' }}
      onDragStart={handleDragStart}
      draggable
    >
      <Text>
        {name} - {location}
      </Text>
    </Flex>
  );
};
