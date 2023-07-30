import { GridItem } from '@chakra-ui/react';
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
    <GridItem w="full" h="full" bg="blue.200" borderColor="white" borderWidth="2px">
      <ReactPlayer
        url={url}
        config={{
          file: {
            attributes: {
              crossOrigin: 'true',
            },
          },
        }}
      />
    </GridItem>
  );
};
