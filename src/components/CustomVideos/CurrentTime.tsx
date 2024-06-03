import { Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface CurrentTimeProps {}

export const CurrentTime = ({}: CurrentTimeProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Flex flexDir="column" justifyContent="center" alignItems="center" w="full" h="full" color="white">
      <Text fontWeight="bold" fontSize="4em">
        {`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`}
      </Text>
      <Text fontSize="2xl">VidGrid</Text>
    </Flex>
  );
};
