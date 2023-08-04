import { useLocalStorage } from '@/hooks/useLocalStorage';
import {
  Box,
  Button,
  Flex,
  Image,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const Welcomer = () => {
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Get if the user has already seen the welcome messsage
    const alreadySeenWelcomeMessage = getLocalStorage('alreadySeenWelcomeMessage');

    // If they have not, show the welcome message and set the local storage item
    if (!alreadySeenWelcomeMessage) setShow(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCloseWelcomeMessage = () => {
    // Set the local storage item
    setLocalStorage('alreadySeenWelcomeMessage', true);

    // Update the show state
    return setShow(false);
  };

  if (!show) return null;

  return (
    <>
      <Flex
        flexDir="column"
        justifyContent="space-between"
        alignItems="center"
        gap="4"
        pos="absolute"
        left="50%"
        top="50%"
        transform="translate(-50%, -50%)"
        zIndex="99"
        bg="#EEEEEC"
        w="min(500px, 95%)"
        borderColor="#EEEEEC"
        borderWidth="2px"
      >
        <Flex bg="black" w="full" p="2" justifyContent="center" alignItems="center">
          <Text fontSize="2xl" fontWeight="bold" color="#EEEEEC">
            Welcome to VidGrid!
          </Text>
        </Flex>
        <Stepper index={4} orientation="vertical" colorScheme="blue" size="sm" transition="all 1s">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
              </StepIndicator>
              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>
        <Flex justifyContent="center" alignItems="center" gap="4">
          <Image alt="step1" src="/step1.png" w="30%" />
          <Text> -&gt; DRAG + DROP -&gt;</Text>
          <Image alt="step3" src="/step3.png" w="30%" />
        </Flex>
        <Flex bg="black" w="full" p="2" justifyContent="center" alignItems="center">
          <Button onClick={handleCloseWelcomeMessage}>Let&apos;s get started!</Button>
        </Flex>
      </Flex>
      <Box w="100vw" h="100vh" pos="absolute" left="0" top="0" backdropFilter="blur(3px)" zIndex="98" />
    </>
  );
};

const steps = [
  { title: 'First', description: 'Select a channel from the left menu' },
  { title: 'Second', description: 'Drag and drop the video on the cell to play' },
  { title: 'Third', description: 'Activate the video to hear it (Settings dropdown)' },
];
