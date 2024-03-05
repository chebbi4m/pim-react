import React, { useState } from "react";
import {
    AvatarGroup,
    Avatar,
    Box,
    Button,
    Flex,
    Icon,
    Image,
    Link,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { IoTrashOutline } from "react-icons/io5";
import { deleteProduct } from '../../services/services';
import SuccessModal from "../modal/modals";
import Card from "components/card/Card.js";

export default function NFT(props) {
    const { id, image, name, author, bidders, download, currentbid } = props;
    const [like, setLike] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const textColor = useColorModeValue("navy.700", "white");
    const textColorBid = useColorModeValue("brand.500", "white");

    const handleDeleteProduct = () => {
        deleteProduct(id)
            .then(() => {
                setShowModal(true);
            })
            .catch(error => {
                console.error("Error deleting product:", error);
            });
    };

    return (
        <Card p='20px'>
            <Flex direction={{ base: "column" }} justify='center'>
                <Box mb={{ base: "20px", "2xl": "20px" }} position='relative'>
                    <Image
                        src={image}
                        w={{ base: "100%", "3xl": "100%" }}
                        h={{ base: "100%", "3xl": "100%" }}
                        borderRadius='20px'
                    />
                    <Button
                        position='absolute'
                        bg='white'
                        _hover={{ bg: "whiteAlpha.900" }}
                        _active={{ bg: "white" }}
                        _focus={{ bg: "white" }}
                        p='0px !important'
                        top='14px'
                        right='14px'
                        borderRadius='50%'
                        minW='36px'
                        h='36px'
                        onClick={handleDeleteProduct}>
                        <Icon
                            transition='0.2s linear'
                            w='20px'
                            h='20px'
                            as={IoTrashOutline}
                            color='brand.500'
                        />
                    </Button>
                </Box>
                <Flex flexDirection='column' justify='space-between' h='100%'>
                    <Flex
                        justify='space-between'
                        direction={{
                            base: "row",
                            md: "column",
                            lg: "row",
                            xl: "column",
                            "2xl": "row",
                        }}
                        mb='auto'>
                        <Flex direction='column'>
                            <Text
                                color={textColor}
                                fontSize={{
                                    base: "xl",
                                    md: "lg",
                                    lg: "lg",
                                    xl: "lg",
                                    "2xl": "md",
                                    "3xl": "lg",
                                }}
                                mb='5px'
                                fontWeight='bold'
                                me='14px'>
                                {name}
                            </Text>
                            <Text
                                color='secondaryGray.600'
                                fontSize={{
                                    base: "sm",
                                }}
                                fontWeight='400'
                                me='14px'>
                                {author}
                            </Text>
                        </Flex>

                    </Flex>
                    <Flex
                        align='start'
                        justify='space-between'
                        direction={{
                            base: "row",
                            md: "column",
                            lg: "row",
                            xl: "column",
                            "2xl": "row",
                        }}
                        mt='25px'>
                        <Text fontWeight='700' fontSize='sm' color={textColorBid}>
                            Price: {currentbid}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <SuccessModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                message="Product deleted successfully!"
                onConfirm={() => window.location.reload()}
            />

        </Card>
    );
}
