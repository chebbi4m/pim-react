import { useState, useMemo } from 'react';
import {
    Flex,
    Table,
    Icon,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Button,
} from "@chakra-ui/react";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import ModifyUserModal from 'components/modal/ModifyUser'; // Import the ModifyUserModal component

import { MdCheckCircle, MdEdit } from "react-icons/md"; // Changed MdOutlineError to MdEdit for modify icon

export default function ColumnsTable(props) {
    const { columnsData, tableData } = props;
    const [loading, setLoading] = useState(false); // State to manage loading state of button
    const [showModifyModal, setShowModifyModal] = useState(false); // State to control the visibility of the ModifyUserModal
    const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user for modification

    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);

    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        initialState,
    } = tableInstance;
    initialState.pageSize = 15;

    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

    // Function to handle banning/unbanning
    const handleBanUnban = async (userId, banned) => {
        setLoading(true); // Set loading state to true while request is being made
        try {
            // Make API request to toggle ban status
            const response = await fetch(`http://127.0.0.1:9090/api/users/ban/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ banned: !banned }), // Pass the opposite of isBanned as the body
            });
            if (response.ok) {
                // If request is successful, update UI or state as necessary
                console.log('User ban status toggled successfully');
                window.location.reload();

            } else {
                // If request fails, handle error
                console.error('Failed to toggle user ban status');
            }
        } catch (error) {
            console.error('Error toggling user ban status:', error.message);
        } finally {
            setLoading(false); // Reset loading state regardless of success or failure
        }
    };

    // Function to handle modifying user
    const handleModifyUser = (user) => {
        // Open the ModifyUserModal with the user data
        // You can pass the user data as props to the modal
        console.log("Modifying user:", user);
        // Set state to open the modal
        setShowModifyModal(true);
        // Store the user data in state to pass to the modal
        setSelectedUser(user);
    };

    return (
        <Card
            direction='column'
            w='100%'
            px='0px'
            overflowX={{ sm: "scroll", lg: "hidden" }}>
            <Flex px='25px' justify='space-between' mb='20px' align='center'>
                <Text
                    color={textColor}
                    fontSize='22px'
                    fontWeight='700'
                    lineHeight='100%'>
                    Admin Table
                </Text>
                <Menu />
            </Flex>
            <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
                <Thead>
                    {headerGroups.map((headerGroup, index) => (
                        <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column, index) => (
                                <Th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    pe='10px'
                                    key={index}
                                    borderColor={borderColor}>
                                    <Flex
                                        justify='space-between'
                                        align='center'
                                        fontSize={{ sm: "10px", lg: "12px" }}
                                        color='gray.400'>
                                        {column.render("Header")}
                                    </Flex>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row, index) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()} key={index}>
                                {row.cells.map((cell, index) => {
                                    let data = "";
                                    if (cell.column.Header === "Username") {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    } else if (cell.column.Header === "Action") {
                                        data = (
                                            <>
                                                <Button
                                                    colorScheme={cell.value ? 'red' : 'green'}
                                                    onClick={() => {
                                                        const userId = row.original._id;
                                                        handleBanUnban(userId, cell.value);
                                                    }}
                                                    isLoading={loading}
                                                >
                                                    {cell.value ? 'Unban' : 'Ban'}
                                                </Button>
                                                <Button
                                                    colorScheme="blue"
                                                    ml={2}
                                                    onClick={() => handleModifyUser(row.original)}
                                                >
                                                    <Icon as={MdEdit} />
                                                </Button>
                                            </>
                                        );
                                    } else if (cell.column.Header === "Verified") {
                                        // Display verification status as icons
                                        data = (
                                            <Icon
                                                w='24px'
                                                h='24px'
                                                color={
                                                    cell.value ? "green.500" : "gray.500"
                                                }
                                                as={MdCheckCircle}
                                            />
                                        );
                                    } else if (cell.column.Header === "Image") {
                                        // Display default image if not provided
                                        data = cell.value || "default image";
                                    } else if (cell.column.Header === "Prohibited Product Types") {
                                        // Display prohibited product types as comma-separated string
                                        data = cell.value.join(", ");
                                    } else {
                                        data = (
                                            <Text color={textColor} fontSize='sm' fontWeight='700'>
                                                {cell.value}
                                            </Text>
                                        );
                                    }
                                    return (
                                        <Td
                                            {...cell.getCellProps()}
                                            key={index}
                                            fontSize={{ sm: "14px" }}
                                            minW={{ sm: "150px", md: "200px", lg: "auto" }}
                                            borderColor='transparent'>
                                            {data}
                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
            {/* Render the ModifyUserModal component */}
            <ModifyUserModal isOpen={showModifyModal} onClose={() => setShowModifyModal(false)} user={selectedUser} />

        </Card>
    );
}
