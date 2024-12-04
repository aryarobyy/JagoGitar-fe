import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

export default function UserPending() {
  const pageVisitsData = [
    { id: 1, name: "Dakota Rice", salary: "$36,738", country: "Niger" },
    { id: 2, name: "Minerva Hooper", salary: "$23,789", country: "Curaçao" },
    { id: 3, name: "Sage Rodriguez", salary: "$56,142", country: "Netherlands" },
    { id: 4, name: "Philip Chaney", salary: "$38,735", country: "Korea, South" },
    { id: 5, name: "John Doe", salary: "$50,000", country: "USA" },
    { id: 6, name: "Jane Smith", salary: "$45,000", country: "Canada" },
    { id: 7, name: "David Johnson", salary: "$60,000", country: "UK" },
    { id: 8, name: "Emma Brown", salary: "$55,000", country: "Australia" },
  ];

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      shadow="md"
      maxH={"254px"}
    >
      <Box
        bg="blue.500"
        px={6}
        py={4}
        color="white"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading as="h2" size="md">
          User pending
        </Heading>
      </Box>
      <Box p={6}>
        <TableContainer
          maxHeight="200px" 
          overflowY="auto" 
        >
          <Table variant="simple">
            <Thead position="sticky" top="0" bg="white" zIndex={1}>
              <Tr>
                <Th color="teal.500" fontSize="sm" textTransform="none">
                  ID
                </Th>
                <Th color="teal.500" fontSize="sm" textTransform="none">
                  Name
                </Th>
                <Th color="teal.500" fontSize="sm" textTransform="none">
                  Country
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {pageVisitsData.map((visit) => (
                <Tr key={visit.id}>
                  <Td color={"black"}>{visit.id}</Td>
                  <Td color={"black"}>{visit.name}</Td>
                  <Td color={"black"}>Terima/tidak</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
