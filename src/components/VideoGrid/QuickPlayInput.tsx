import { Box, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import { Dispatch, FormEvent } from 'react';

interface QuickPlayInputProps {
  handleQuickPlaySubmit: (e: FormEvent<HTMLDivElement>) => void;
  setQuickPlayUrl: Dispatch<React.SetStateAction<string>>;
}

export const QuickPlayInput = ({ handleQuickPlaySubmit, setQuickPlayUrl }: QuickPlayInputProps) => {
  return (
    <Box as="form" onSubmit={handleQuickPlaySubmit}>
      <InputGroup
        opacity="0.6"
        borderColor="#EEEEEC"
        borderWidth="1px"
        pos="absolute"
        zIndex={2}
        w="90%"
        size="xs"
        borderRadius="md"
        left="50%"
        bottom="5%"
        transform="translate(-50%)"
      >
        <InputLeftAddon color="black">Quick Play</InputLeftAddon>
        <Input
          type="text"
          placeholder="https://youtube.com/12345"
          color="#EEEEEF"
          onChange={(e) => setQuickPlayUrl(e.target.value)}
        />
      </InputGroup>
    </Box>
  );
};
