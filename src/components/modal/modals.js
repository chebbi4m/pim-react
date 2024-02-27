import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@chakra-ui/react';

const SuccessModal = ({ isOpen, onClose, onConfirm }) => {
    const handleClose = () => {
        onClose(); // Close the modal
        onConfirm(); // Call the onConfirm function provided as a prop
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Product Deleted</ModalHeader>
                <ModalBody>
                    The product has been successfully deleted.
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="brand" onClick={handleClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SuccessModal;
