import { Flex, Text } from '@chakra-ui/react';

interface ChannelItemProps {
  name: string;
  location: string;
  url: string;
}

export const ChannelItem = ({ name, location, url }: ChannelItemProps) => {
  return (
    <Flex
      alignItems="center"
      my="1"
      py="0.5"
      px="1"
      _hover={{ backgroundColor: 'gray.700', cursor: 'pointer' }}
      draggable
    >
      <Text>
        {name} - {location}
      </Text>
    </Flex>
  );
};
