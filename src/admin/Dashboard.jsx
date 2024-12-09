import { Box, SimpleGrid, Grid, Container, useColorModeValue } from "@chakra-ui/react";
import UserTable from "./tables/UserTable";

export default function Dashboard() {
  return (
    <>
      <Box bg={useColorModeValue("gray.300", "gray.dark")} px={{ base: 3, md: 8 }} h="40" />
      <Box px={{ base: 3, md: 8 }} h="auto">
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: "1fr", xl: "3fr 2fr" }} gap={4} mb={20}>
            <UserTable headers={"Daftar User Pending"} statusFilter="userPending" roleFilter="pending" />
            <UserTable headers={"Daftar User Active"}  statusFilter="userActive" roleFilter="user" />
          </Grid> 
          <Grid templateColumns={{ base: "1fr", xl: "3fr 2fr" }} gap={4} >
            <UserTable headers={"Daftar mentor Pending"}  statusFilter="mentorPending" roleFilter="mentor" />
            <UserTable headers={"Daftar User Active"}  statusFilter="mentorActive" roleFilter="mentor" />
          </Grid> 
        </Container>
      </Box>
    </>
  );
}
