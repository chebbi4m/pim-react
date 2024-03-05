import React, { useState, useEffect } from "react";
import {
    Box,
    Flex,
    Text,
    Link,
    Button,
    useColorModeValue,
    SimpleGrid,
} from "@chakra-ui/react";
import { MdBarChart } from "react-icons/md"; // Import MdBarChart icon
import Banner from "views/admin/marketplace/components/Banner";
import NFT from "components/card/NFT";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import AddProductModal from "../../../components/modal/AddProductModals"; // Import your modal component
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
export default function Marketplace() {
    const [nfts, setNFTs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for managing modal visibility
    const textColor = useColorModeValue("secondaryGray.900", "white");

    useEffect(() => {
        // Fetch data from your API endpoint
        fetch("http://127.0.0.1:9090/api/product/")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Data received:", data); // Log the received JSON data
                setNFTs(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Box>
            <Flex direction="column">
                <Flex
                    mt="150px"
                    mb="20px"
                    justifyContent="space-between"
                    direction={{ base: "column", md: "row" }}
                    align={{ base: "start", md: "center" }}
                >
                    {/* You can add content here if needed */}
                </Flex>
                <Banner />
                <Flex
                    mt="45px"
                    mb="36px"
                    direction="row"
                    justify="space-between"
                    align="center"
                    ms="24px"
                    mr="24px"
                >
                    <Text
                        color={textColor}
                        fontSize="2xl"
                        fontWeight="700"
                    >
                        Products
                    </Text>
                    <Button colorScheme="teal" onClick={openModal}>
                        Add Product
                    </Button>
                    <AddProductModal isOpen={isModalOpen} onClose={closeModal} />
                </Flex>

                <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
                    {nfts.map((nft) => (
                        <React.Fragment key={nft.id}> {/* Use Fragment to avoid wrapping with unnecessary elements */}
                            {console.log("NFT ID:", nft._id)} {/* Log the ID */}
                            <NFT
                                id={nft._id}
                                key={nft._id} // Assuming 'id' is a unique identifier
                                name={nft.ProductName}
                                author={nft.Description}
                                image={nft.image ? Math.random() < 0.5 ? Nft1 : Nft2 : Nft3}
                                currentbid={nft.Price}
                            />
                        </React.Fragment>
                    ))}
                </SimpleGrid>
            </Flex>
        </Box>
    );
}
