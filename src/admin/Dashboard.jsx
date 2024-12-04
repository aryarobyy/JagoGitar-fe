import { Box, SimpleGrid, Grid, Container } from "@chakra-ui/react";
import UserPending from "./tables/UserPending";
import MentorPending from "./tables/MentorPending";
import UserActive from "./tables/UserActive";
import MentorActive from "./tables/MentorActive";

export default function Dashboard() {
  return (
    <>
      <Box bg="lightBlue.500" px={{ base: 3, md: 8 }} h="40" />
      <Box px={{ base: 3, md: 8 }} h="auto">
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: "1fr", xl: "3fr 2fr" }} gap={4} mb={20}>
            <UserActive />
            <UserPending />
          </Grid> 
          <Grid templateColumns={{ base: "1fr", xl: "3fr 2fr" }} gap={4} >
            <MentorActive />
            <MentorPending />
          </Grid> 
        </Container>
      </Box>
    </>
  );
}
