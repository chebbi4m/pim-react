import React, { useState } from "react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Select,
} from "@chakra-ui/react";

function AddProductModal({ isOpen, onClose }) {

    const [SellerId, setSellerId] = useState("");
    const [ProductName, setProductName] = useState("");
    const [Description, setDescription] = useState("");
    const [Price, setPrice] = useState("");
    const [Type, setType] = useState("");

    const handleSubmit = async () => {
        try {
            const productData = {
                SellerId,
                ProductName,
                Description,
                Price,
                Type,
            };

            const response = await fetch('http://127.0.0.1:9090/api/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error('Failed to add product');
            }

            const responseData = await response.json();

            // Optionally, handle success response
            console.log('Product added successfully:', responseData);

            // Close the modal
            onClose();
            window.location.reload();
        } catch (error) {
            // Handle error
            console.error('Error adding product:', error);

            // Optionally, display an error message to the user
        }
    };


    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>SellerID</FormLabel>
                        <Input
                            value={SellerId}
                            onChange={(e) => setSellerId(e.target.value)}
                            placeholder="SellerID"
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Product Name</FormLabel>
                        <Input
                            value={ProductName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="Product Name"
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Description</FormLabel>
                        <Input
                            value={Description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Price</FormLabel>
                        <Input
                            value={Price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price"
                            type="number"
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Type</FormLabel>
                        <Select
                            value={Type}
                            onChange={(e) => setType(e.target.value)}
                            placeholder="Select type"
                        >
                            <option value="Toys">Toys</option>
                            <option value="Books">Books</option>
                            <option value="Games">Games</option>
                            <option value="School Supplies">School Supplies</option>
                            <option value="Clothes">Clothes</option>
                            <option value="Snacks">Snacks</option>
                            <option value="Stationery">Stationery</option>
                            <option value="Art Supplies">Art Supplies</option>
                            <option value="Sports Equipment">Sports Equipment</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Diabetic Snacks">Diabetic Snacks</option>
                        </Select>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        Add Product
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default AddProductModal;
