import { useChannelsContext } from '@/contexts/useChannels';
import {
  Button,
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

interface DeleteCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteCategoryModal = ({ isOpen, onClose }: DeleteCategoryModalProps) => {
  const { channels, deleteCategory } = useChannelsContext();
  const [deleteCategoryName, setDeleteCategoryName] = useState<string | null>(null);
  const canSubmit = deleteCategoryName !== null && deleteCategoryName !== '';

  // Get all categories
  const categories = Object.keys(channels);

  const handleSubmitClick = () => {
    if (!canSubmit) return;

    // Delete the category
    deleteCategory(deleteCategoryName);

    // Reset the delete category name
    setDeleteCategoryName(null);

    // Close the modal
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent backgroundColor="black" color="#EEEEEC" borderColor="#EEEEEC" borderWidth="1px">
        <ModalHeader>Delete Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select onChange={(e) => setDeleteCategoryName(e.target.value)}>
            <option value={''}>Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
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
