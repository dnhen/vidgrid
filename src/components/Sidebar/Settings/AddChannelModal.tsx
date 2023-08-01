import { useChannelsContext } from '@/contexts/useChannels';
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';
import { useState } from 'react';

interface AddChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddChannelModal = ({ isOpen, onClose }: AddChannelModalProps) => {
  const { channels, addChannel } = useChannelsContext();
  const [newChannelCategoryName, setNewChannelCategoryName] = useState<string | null>(null);
  const [newChannelName, setNewChannelName] = useState<string | null>(null);
  const [newChannelLocation, setNewChannelLocation] = useState<string | null>(null);
  const [newChannelUrl, setNewChannelUrl] = useState<string | null>(null);
  const [newChannelLogoUrl, setNewChannelLogoUrl] = useState<string | null>('https://via.placeholder.com/50');
  const canSubmit =
    newChannelCategoryName !== null &&
    newChannelCategoryName !== '' &&
    newChannelName !== null &&
    newChannelName !== '' &&
    newChannelLocation !== null &&
    newChannelLocation !== '' &&
    newChannelUrl !== null &&
    newChannelUrl !== '';

  // Get all categories
  const categories = Object.keys(channels);

  const handleSubmitClick = () => {
    if (!canSubmit) return;

    // Add the channel
    addChannel(
      newChannelCategoryName,
      newChannelName,
      newChannelLocation,
      newChannelUrl,
      'https://via.placeholder.com/50'
    );

    // Reset the new channel inputs
    setNewChannelCategoryName(null);
    setNewChannelName(null);
    setNewChannelLocation(null);
    setNewChannelUrl(null);
    setNewChannelLogoUrl(null);

    // Close the modal
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent backgroundColor="black" color="#EEEEEC" borderColor="#EEEEEC" borderWidth="1px">
        <ModalHeader>Add Channel</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" gap="4">
            <Select onChange={(e) => setNewChannelCategoryName(e.target.value)}>
              <option value={''}>Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
            <Input
              placeholder="Channel Name"
              onChange={(e) => setNewChannelName(e.target.value)}
              backgroundColor="black"
              borderColor="#EEEEEC"
            />
            <Input
              placeholder="Channel Location"
              onChange={(e) => setNewChannelLocation(e.target.value)}
              backgroundColor="black"
              borderColor="#EEEEEC"
            />
            <Input
              placeholder="Channel URL"
              onChange={(e) => setNewChannelUrl(e.target.value)}
              backgroundColor="black"
              borderColor="#EEEEEC"
            />
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button variant="solid" colorScheme="blackAlpha" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="green" isDisabled={!canSubmit} onClick={handleSubmitClick}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
