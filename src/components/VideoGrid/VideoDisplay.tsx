import { useControlsContext } from '@/contexts/useControls';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { Box, Flex, GridItem, Icon, Text, useToast } from '@chakra-ui/react';
import { DragEvent, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

interface VideoDisplayProps {
  index: number;
}

export const VideoDisplay = ({ index }: VideoDisplayProps) => {
  const toast = useToast();
  const { getLocalStorage, setLocalStorage, deleteLocalStorage } = useLocalStorage();
  const { activeVideos, isVideoActive, removeActiveVideo, gridSize, gridSizeMap } = useControlsContext();
  const { selectedVideo, setSelectedVideo } = useControlsContext();
  const [mounted, setMounted] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string | null>(null);
  const [borderColor, setBorderColor] = useState<string>('#EEEEEC');
  const [volume, setVolume] = useState<number>(0);

  useEffect(() => {
    // Wait for client to load before loading any videos
    setMounted(true);

    // Get the video from local storage
    const savedVideo = getLocalStorage(`video-${index}`);

    // If the video exists in local storage
    if (!!savedVideo) {
      // Play the video
      playVideo(savedVideo.videoUrl, savedVideo.videoName);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

    // Play the video
    return playVideo(droppedUrl, droppedName);
  };

  const handleOnClick = () => {
    // Play the selected video
    selectedVideo?.url && playVideo(selectedVideo?.url || '', selectedVideo?.name || '');

    // Reset the selected video
    return setSelectedVideo(null);
  };

  const playVideo = (url: string, name: string) => {
    // If the player can not play the URL
    if (!ReactPlayer.canPlay(url)) {
      // Toast an error
      return toast({
        title: 'Oh no!',
        description: 'Unable to play this URL. Try another one.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    // Remove the video from active videos
    removeActiveVideo(index);

    // Can play -> set border color back to white, volume to 0, and set video name/video url
    setBorderColor('white');
    setVolume(0);
    setVideoName(name);

    // Save video to local storage
    setLocalStorage(`video-${index}`, { videoUrl: url, videoName: name });

    return setVideoUrl(url);
  };

  const stopVideo = () => {
    // Stop the video
    setVideoUrl(null);
    setVideoName(null);

    // Remove video from local storage
    deleteLocalStorage(`video-${index}`);

    return toast({
      title: 'Video stopped',
      description: 'The video has been stopped.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
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
      onClick={handleOnClick}
      gridRowStart={gridSizeMap[gridSize].elements[index].rowStart}
      gridRowEnd={gridSizeMap[gridSize].elements[index].rowEnd}
      gridColumnStart={gridSizeMap[gridSize].elements[index].colStart}
      gridColumnEnd={gridSizeMap[gridSize].elements[index].colEnd}
      zIndex="3"
    >
      <Box w="full" h="full" zIndex="1" pos="absolute" left="0" top="0" />
      {!!videoName && (
        <Flex
          justifyContent="center"
          alignItems="center"
          pos="absolute"
          left="0"
          bottom="0"
          zIndex={2}
          px="1"
          py="0.5"
          bg="rgba(255, 255, 255, 0.5)"
          gap="1"
        >
          <Icon as={SmallCloseIcon} boxSize="16px" cursor="pointer" onClick={stopVideo} />
          <Text fontSize="xs" fontWeight="semibold" color="black" noOfLines={1}>
            {`${videoName} / ${index + 1}`}
          </Text>
        </Flex>
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
          style={{ position: 'absolute', top: 0, left: 0, zIndex: '0' }}
        />
      )}
    </GridItem>
  );
};
