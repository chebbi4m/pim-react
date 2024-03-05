import React, { useEffect, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import AdminTable from "views/admin/userTables/components/AdminTable";
import { adminsData } from "./variables/columnsData";

export default function Settings() {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:9090/api/users"); // Replace the URL with your API endpoint
            if (!response.ok) {
                throw new Error("Failed to fetch table data");
            }
            const data = await response.json();
            setTableData(data);
            console.log("Table data received:", data); // Log the received table data
        } catch (error) {
            console.error("Error fetching table data:", error);
        }
    };

    return (
        
        <Box width="2400px" pt={{ base: "140px", md: "100px", xl: "80px" }}>
            <SimpleGrid
                mb='20px'
                columns={{ sm: 1, md: 2 }}
                spacing={{ base: "20px", xl: "20px" }}
            >
                <AdminTable columnsData={adminsData} tableData={tableData} />
            </SimpleGrid>
        </Box>
    );
}
