import { useControlsContext } from '@/contexts/useControls';
import { Flex, Text } from '@chakra-ui/react';
import { DragEvent } from 'react';

interface ChannelItemProps {
  name: string;
  location: string;
  url: string;
}

export const ChannelItem = ({ name, location, url }: ChannelItemProps) => {
  const { selectedVideo, setSelectedVideo } = useControlsContext();

  const handleDragStart = (e: DragEvent) => {
    // Set the data to be transferred
    e.dataTransfer.setData('videoUrl', url);
    e.dataTransfer.setData('videoName', `${name} - ${location}`);

    return;
  };

  const handleOnClick = () => {
    // Set the selected video
    return setSelectedVideo({ url, name: `${name} - ${location}` });
  };

  return (
    <Flex
      alignItems="center"
      my="1"
      py="0.5"
      px="1"
      backgroundColor={selectedVideo?.url === url ? 'gray.700' : ''}
      _hover={{ backgroundColor: 'gray.700', cursor: 'pointer' }}
      onDragStart={handleDragStart}
      onClick={handleOnClick}
      draggable
    >
      <Text>
        {name} - {location}
      </Text>
    </Flex>
  );
};
