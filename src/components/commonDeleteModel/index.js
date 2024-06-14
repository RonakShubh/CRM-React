import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const CommonDeleteModel = (props) => {
  const { isOpen, onClose, type, handleDeleteData, ids, selectedValues } =
    props;

  const handleDelete = () => {
    handleDeleteData(ids, selectedValues);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete {`${type}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are You Sure To Delete selected {`${type}`} ?</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              size="sm"
              mr={2}
              onClick={handleDelete}
              disabled={false}
            >
              {"Yes"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleClose}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CommonDeleteModel;
