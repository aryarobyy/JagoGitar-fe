import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Icon, Text, Stack, Divider, Container } from '@chakra-ui/react';
import { 
  SettingsIcon, 
  ViewIcon, 
  DownloadIcon, 
  InfoOutlineIcon, 
} from '@chakra-ui/icons';
import AdminNavbar from './AdminNavbar';

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState('-left-64');

  return (
    <>
      <AdminNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Box
        position="fixed"
        top="0"
        left={showSidebar}
        height="100vh"
        width="64"
        bg="gray.800"
        color="white"
        boxShadow="xl"
        zIndex="10"
        py="4"
        px="6"
        overflowY="auto"
        transition="all 0.3s"
      >
        <Flex direction="column" alignItems="stretch" minHeight="full" position="relative">
          <Link
            to="https://material-tailwind.com?ref=mtd"
            target="_blank"
            rel="noreferrer"
            className="w-full text-center"
          >
            <Text color="gray.400" fontSize="sm">Material Tailwind</Text>
          </Link>
          <Divider my="4" borderColor="gray.600" />
          <Stack spacing="4">
            <NavItem to="/" icon={ViewIcon} label="Dashboard" />
            <NavItem to="/settings" icon={SettingsIcon} label="Courses" />
          </Stack>
          <Stack spacing="2" position="absolute" bottom="0" width="100%">
            <NavItem to="https://material-tailwind.com/documentation/quick-start" icon={InfoOutlineIcon} label="Documentation" external bg="blue.500" />
            <NavItem to="https://www.creative-tim.com/product/material-tailwind-dashboard-react" icon={DownloadIcon} label="Free Download" external bg="purple.500" />
          </Stack>
        </Flex>
      </Box>
    </>
  );
}

const NavItem = ({ to, icon, label, external, bg }) => {
  return (
    <Box
      as={external ? 'a' : Link}
      href={external ? to : undefined}
      to={!external ? to : undefined}
      display="flex"
      alignItems="center"
      gap="4"
      fontSize="sm"
      px="4"
      py="3"
      rounded="lg"
      bg={bg || 'transparent'}
      color="white"
      _hover={{
        bg: bg ? bg : 'gray.700',
        textDecoration: 'none',
      }}
    >
      <Icon as={icon} boxSize={6} />
      <Text>{label}</Text>
    </Box>
  );
};
