import { Sidebar } from '@/components/Sidebar';
import { Box, Flex } from '@chakra-ui/react';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <Flex w="100vw" h="100vh">
      <Sidebar />
      <Box w="full" h="full">
        {children}
      </Box>
    </Flex>
  );
};
