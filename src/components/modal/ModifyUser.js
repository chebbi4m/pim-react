import React, { useState, useEffect } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Select,
    Button,

} from "@chakra-ui/react";

function ModifyUserModal({ isOpen, onClose, user }) {
    const [Username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [Role, setRole] = useState("");

    useEffect(() => {
        if (user) {
            setUsername(user.Username);
            setEmail(user.Email);
            setPhoneNumber(user.PhoneNumber);
            setRole(user.Role);
        }
    }, [user]);
    console.log("Selected user:", user);

    const handleSubmit = async () => {
        try {
            const userData = {
                Username: Username,
                Email: Email,
                PhoneNumber: PhoneNumber,
                Role: Role,
            };

            const response = await fetch(`http://127.0.0.1:9090/api/users/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Failed to update');
            }

            const responseData = await response.json();

            // Optionally, handle success response
            console.log('updated successfully:', responseData);

            // Close the modal
            onClose();
            window.location.reload();
        } catch (error) {
            // Handle error
            console.error('Error update user:', error);

            // Optionally, display an error message to the user
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modify User</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input
                            value={Username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            isReadOnly={true} // Set isReadOnly to true to disable editing

                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>PhoneNumber</FormLabel>
                        <Input
                            value={PhoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="PhoneNumber"
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Role</FormLabel>
                        <Select
                            value={Role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="Select role"
                        >
                            <option value="partner">Partner</option>
                            <option value="admin">Admin</option>
                            <option value="parent">Parent</option>
                            <option value="child">Child</option>
                        </Select>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        Update User
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ModifyUserModal;
