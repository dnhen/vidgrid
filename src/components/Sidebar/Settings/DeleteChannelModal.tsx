import { useChannelsContext } from '@/contexts/useChannels';
import {
  Button,
  Flex,
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

interface DeleteChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteChannelModal = ({ isOpen, onClose }: DeleteChannelModalProps) => {
  const { channels, deleteChannel } = useChannelsContext();
  const [deleteChannelCategoryName, setDeleteChannelCategoryName] = useState<string | null>(null);
  const [deleteChannelUrl, setDeleteChannelUrl] = useState<string | null>(null);
  const canSubmit =
    deleteChannelCategoryName !== null &&
    deleteChannelCategoryName !== '' &&
    deleteChannelUrl !== null &&
    deleteChannelUrl !== '';

  // Get all categories
  const categories = Object.keys(channels);

  const handleSubmitClick = () => {
    if (!canSubmit) return;

    // Add the category
    deleteChannel(deleteChannelCategoryName, deleteChannelUrl);

    // Reset the new category name
    setDeleteChannelCategoryName(null);
    setDeleteChannelUrl(null);

    // Close the modal
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent backgroundColor="black" color="#EEEEEC" borderColor="#EEEEEC" borderWidth="1px">
        <ModalHeader>Delete Channel</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" gap="4">
            <Select onChange={(e) => setDeleteChannelCategoryName(e.target.value)}>
              <option value={''}>Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
            <Select onChange={(e) => setDeleteChannelUrl(e.target.value)} disabled={!deleteChannelCategoryName}>
              <option value={''}>Select a channel</option>
              {deleteChannelCategoryName &&
                channels[deleteChannelCategoryName]?.map((channel) => (
                  <option key={channel.url} value={channel.url}>
                    {`${channel.name} - ${channel.location}`}
                  </option>
                ))}
            </Select>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button variant="solid" colorScheme="blackAlpha" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" isDisabled={!canSubmit} onClick={handleSubmitClick}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
