import { Link as RouterLink, useLocation } from "react-router-dom";
import { Flex, Box, Text, IconButton, Input, Image, Menu, MenuButton, MenuList, MenuItem, Avatar, Button , Link} from "@chakra-ui/react";
import useGetUserProfile from "../../hooks/useGetUserProfile";
import { useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom";

export default function AdminNavbar() {
  const location = useLocation().pathname;
  const  user = useRecoilValue(userAtom);

  return (
    <Box bg="lightBlue.500" py={6} px={3}>
      <Flex
        maxW="full"
        mx="auto"
        align="center"
        justify="space-between"
        px={{ base: 3, md: 10 }}
      >
        {/* Navbar Title */}
        <Text
          textTransform="uppercase"
          color="white"
          fontSize="sm"
          fontWeight="bold"
          letterSpacing="wide"
        >
          {location === "/admin"
            ? `Welcome, ${user.username}`
            : location.toUpperCase().replace("/admin", "")}
        </Text>

        {/* Search and Profile Section */}
        <Flex align="center">
          <Menu>
            <MenuButton>
            {user.userPP && (
              <Avatar
                  name={user.name}
                  src={user.userPP}
                  size={{
                      base: "md",
                      md: "md",
                  }}
              />
          )}
          {!user.userPP && (
              <Avatar
                  name={user.name}
                  src='https://bit.ly/broken-link'
                  size={{
                      base: "md",
                      md: "md",
                  }}
              />
          )}
            </MenuButton>
            <MenuList>
              <MenuItem>Action</MenuItem>
              <MenuItem>Another Action</MenuItem>
              <MenuItem>Something Else</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <Link as={RouterLink} to="/" mx={4} ml={9}>
        <Button>
          Back
        </Button>
      </Link>
    </Box>
  );
}
