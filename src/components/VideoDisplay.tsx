import { GridItem, Text, useToast } from '@chakra-ui/react';
import { DragEvent, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

interface VideoDisplayProps {}

export const VideoDisplay = ({}: VideoDisplayProps) => {
  const toast = useToast();
  const [mounted, setMounted] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string | null>(null);
  const [borderColor, setBorderColor] = useState<string>('#EEEEEC');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOnDragEnter = (e: DragEvent) => {
    return setBorderColor('red');
  };

  const handleOnDragLeave = (e: DragEvent) => {
    return setBorderColor('#EEEEEC');
  };

  const handleOnDrop = (e: DragEvent) => {
    e.preventDefault();

    const droppedUrl = e.dataTransfer.getData('videoUrl');
    const droppedName = e.dataTransfer.getData('videoName');

    if (!ReactPlayer.canPlay(droppedUrl)) {
      return toast({
        title: 'Oh no!',
        description: 'Unable to play this URL. Try another one.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    setBorderColor('white');
    setVideoName(droppedName);
    return setVideoUrl(droppedUrl);
  };

  if (!mounted) return <></>;

  return (
    <GridItem
      w="full"
      h="full"
      borderColor={borderColor}
      borderWidth="1px"
      pos="relative"
      bg="black"
      onDragOver={(e: DragEvent) => e.preventDefault()}
      onDragEnter={handleOnDragEnter}
      onDragLeave={handleOnDragLeave}
      onDrop={handleOnDrop}
    >
      {!!videoName && (
        <Text
          fontSize="xs"
          fontWeight="semibold"
          color="black"
          pos="absolute"
          left="0"
          bottom="0"
          zIndex={1}
          px="1"
          py="0.5"
          bg="rgba(255, 255, 255, 0.5)"
        >
          {videoName}
        </Text>
      )}
      {!!videoUrl && (
        <ReactPlayer
          width="100%"
          height="100%"
          url={videoUrl}
          volume={0}
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
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      )}
    </GridItem>
  );
};
