import React from "react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    Select, // Import Select component
    useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
// Assets
import illustration from "assets/img/auth/elkindey.jpg";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

function ProductAdd() {
    // Chakra color mode
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const brandStars = useColorModeValue("brand.500", "brand.400");

    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    return (
        <Box
            w="100%"
            maxW="450px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            mx="auto"
            my={{ base: "30px", md: "60px" }}
            p={{ base: "20px", md: "40px" }}
        >
            <Heading color={textColor} fontSize='36px' mb='10px'>
                Add Product
            </Heading>
            <Text
                mb='36px'
                ms='4px'
                color={textColorSecondary}
                fontWeight='400'
                fontSize='md'>
                Enter product details to add a new product.
            </Text>

            <FormControl>
                <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'>
                    Product Name<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                    isRequired={true}
                    variant='auth'
                    fontSize='sm'
                    ms={{ base: "0px", md: "0px" }}
                    type='text'
                    placeholder='Product Name'
                    mb='24px'
                    fontWeight='500'
                    size='lg'
                />

                <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'>
                    Description<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                    isRequired={true}
                    variant='auth'
                    fontSize='sm'
                    ms={{ base: "0px", md: "0px" }}
                    type='text'
                    placeholder='Description'
                    mb='24px'
                    fontWeight='500'
                    size='lg'
                />

                <FormLabel
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    display='flex'>
                    Price<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                    isRequired={true}
                    variant='auth'
                    fontSize='sm'
                    ms={{ base: "0px", md: "0px" }}
                    type='number'
                    placeholder='Price'
                    mb='24px'
                    fontWeight='500'
                    size='lg'
                />

                <FormLabel
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    display='flex'>
                    Type<Text color={brandStars}>*</Text>
                </FormLabel>
                <Select
                    placeholder="Select type"
                    mb='24px'
                    size='lg'
                    fontWeight='500'
                    fontSize='sm'
                >
                    <option value="toys">Toys</option>
                    <option value="books">Books</option>
                    <option value="games">Games</option>
                    <option value="school supplies">School Supplies</option>
                    <option value="clothes">Clothes</option>
                    <option value="snacks">Snacks</option>
                    <option value="stationery">Stationery</option>
                    <option value="art supplies">Art Supplies</option>
                    <option value="sports equipment">Sports Equipment</option>
                    <option value="electronics">Electronics</option>
                    <option value="diabetic snacks">Diabetic Snacks</option>
                    {/* Add more options as needed */}
                </Select>

                <Button
                    fontSize='sm'
                    variant='brand'
                    fontWeight='500'
                    w='100%'
                    h='50'
                    mb='24px'>
                    Add Product
                </Button>
            </FormControl>
        </Box>
    );
}

export default ProductAdd;
