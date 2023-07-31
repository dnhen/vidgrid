import { useControlsContext } from '@/contexts/useControls';
import { GridItem, Text, useToast } from '@chakra-ui/react';
import { DragEvent, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

interface VideoDisplayProps {
  index: number;
}

export const VideoDisplay = ({ index }: VideoDisplayProps) => {
  const toast = useToast();
  const { activeVideos, isVideoActive, removeActiveVideo } = useControlsContext();
  const [mounted, setMounted] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string | null>(null);
  const [borderColor, setBorderColor] = useState<string>('#EEEEEC');
  const [volume, setVolume] = useState<number>(0);

  useEffect(() => {
    // Wait for client to load before loading any videos
    setMounted(true);
  }, []);

  useEffect(() => {
    isVideoActive(index) ? activateVideo() : deactivateVideo();
  }, [activeVideos, index]); // eslint-disable-line react-hooks/exhaustive-deps

  const activateVideo = () => {
    // Activate video
    setBorderColor('red');
    setVolume(1);
    return;
  };

  const deactivateVideo = () => {
    // Deactivate video
    setBorderColor('#EEEEEC');
    setVolume(0);
    return;
  };

  const handleOnDragEnter = (e: DragEvent) => {
    // Set the border color to red when drag enters
    return setBorderColor('blue');
  };

  const handleOnDragLeave = (e: DragEvent) => {
    // Set the border color to gray when drag leaves
    return isVideoActive(index) ? setBorderColor('red') : setBorderColor('#EEEEEC');
  };

  const handleOnDrop = (e: DragEvent) => {
    e.preventDefault();

    // Get the data from the drag event
    const droppedUrl = e.dataTransfer.getData('videoUrl');
    const droppedName = e.dataTransfer.getData('videoName');

    // If the player can not play the URL
    if (!ReactPlayer.canPlay(droppedUrl)) {
      // Toast an error
      return toast({
        title: 'Oh no!',
        description: 'Unable to play this URL. Try another one.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    // Remove the video from active videos
    removeActiveVideo(index);

    // Can play -> set border color back to white, volume to 0, and set video name/video url
    setBorderColor('white');
    setVolume(0);
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
          volume={volume}
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
