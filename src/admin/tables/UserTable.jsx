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
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllUser, changeUser, delUser } from "../../connector/UserConnector";

export default function UserTable({ statusFilter, roleFilter, headers }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUser();
        setUsers(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const handleApproveUser = async (userId) => {
    try {
      const res = await changeUser(userId, { status: "userActive" });
      console.log("Response", res);
  
      setUsers((prev) =>
        prev.map((user) =>
          user.userId === userId ? { ...user, role: "user",status: "userActive" } : user
        )
      );
      window.location.reload()
    } catch (e) {
      console.error(e);
    }
  };
  

  const handleApproveMentor = async (userId) => {
    try {
      await changeUser(userId, { role: "mentor", status: "mentorActive" });
      setUsers((prev) =>
        prev.map((user) =>
          user.userId === userId
            ? { ...user, role: "mentor", status: "mentorActive" }
            : user
        )
      );
      window.location.reload()
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await delUser(userId);
      setUsers((prev) => prev.filter((user) => user.userId !== userId));
    } catch (e) {
      console.error(e);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      (!statusFilter || user.status === statusFilter) &&
      (!roleFilter || user.role === roleFilter)
  );

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      shadow="md"
      maxH="254px"
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
          {headers}
        </Heading>
      </Box>
      <Box p={6}>
        <TableContainer maxHeight="200px" overflowY="auto" overflowX="hidden"  border="1px solid #e2e8f0" >
          <Table variant="simple">
            <Thead position="sticky" top="0" bg="white" zIndex={1}>
              <Tr>
                <Th color="teal.500" fontSize="sm" textTransform="none">
                  No
                </Th>
                <Th color="teal.500" fontSize="sm" textTransform="none">
                  Name
                </Th>
                <Th color="teal.500" fontSize="sm" textTransform="none">
                  Role
                </Th>
                <Th color="teal.500" fontSize="sm" textTransform="none">
                  Status
                </Th>
                {(statusFilter === "userPending" || statusFilter === "mentorPending") && (
                  <Th
                    color="teal.500"
                    fontSize="sm"
                    textTransform="none"
                    textAlign="center"
                  >
                    Actions
                  </Th>
                )}
              </Tr>
            </Thead>
            <Tbody>
              {filteredUsers.map((user, index) => (
                <Tr key={user.userId}>
                  <Td color="black">{index + 1}</Td>
                  <Td color="black">{user.name}</Td>
                  <Td color="black">{user.role}</Td>
                  <Td color="black">{user.status}</Td>
                  {(statusFilter === "userPending" || statusFilter === "mentorPending") && (
                    <Td>
                      <Box display="flex" justifyContent="center">
                        <Button
                          bgColor="green"
                          color="white"
                          _hover={{ bgColor: "darkgreen" }}
                          mx={2}
                          onClick={() =>
                            statusFilter === "mentorPending"
                              ? handleApproveMentor(user.userId)
                              : handleApproveUser(user.userId)
                          }
                        >
                          Terima
                        </Button>
                        <Button
                          bgColor="red"
                          color="white"
                          _hover={{ bgColor: "darkred" }}
                          mx={2}
                          onClick={() => handleDeleteUser(user.userId)}
                        >
                          Tolak
                        </Button>
                      </Box>
                    </Td>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
