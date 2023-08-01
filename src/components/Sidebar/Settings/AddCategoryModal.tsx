import { useChannelsContext } from '@/contexts/useChannels';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useState } from 'react';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCategoryModal = ({ isOpen, onClose }: AddCategoryModalProps) => {
  const { addCategory } = useChannelsContext();
  const [newCategoryName, setNewCategoryName] = useState<string | null>(null);
  const canSubmit = newCategoryName !== null && newCategoryName !== '';

  const handleSubmitClick = () => {
    if (!canSubmit) return;

    // Add the category
    addCategory(newCategoryName);

    // Reset the new category name
    setNewCategoryName(null);

    // Close the modal
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent backgroundColor="black" color="#EEEEEC" borderColor="#EEEEEC" borderWidth="1px">
        <ModalHeader>Add Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Category Name"
            onChange={(e) => setNewCategoryName(e.target.value)}
            backgroundColor="black"
            borderColor="#EEEEEC"
          />
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
