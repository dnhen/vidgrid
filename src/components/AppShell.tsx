import { Box } from '@chakra-ui/react';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  return <Box>{children}</Box>;
};
