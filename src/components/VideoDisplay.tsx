import { Flex, GridItem } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

interface VideoDisplayProps {
  url: string;
}

export const VideoDisplay = ({ url }: VideoDisplayProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <GridItem w="full" h="full" borderColor="black" borderWidth="2px">
      <Flex justifyContent="center" alignItems="center" w="full" h="full" bg="gray.200">
        <ReactPlayer
          url={url}
          muted={true}
          playing={true}
          config={{
            file: {
              forceHLS: true,
              attributes: {
                crossOrigin: 'true',
              },
            },
          }}
        />
      </Flex>
    </GridItem>
  );
};
