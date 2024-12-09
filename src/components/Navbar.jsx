import { Button, Flex, Box, Image, Link, Container, Menu, MenuButton, IconButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useRecoilValue, useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { RxAvatar } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import Logo from "../assets/image/Logo.png";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useBreakpointValue } from "@chakra-ui/react";

const Navbar = ({ handleLogout }) => {
    const user  = useRecoilValue(userAtom);
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Container maxW="1440px" w="full" >
            <Flex justifyContent={"center"} mt={6}>
                <Link as={RouterLink} to='/'>
                    <Image src={Logo} />
                </Link>
            </Flex>
            <Flex justifyContent={"space-between"} mt={9} mb='12vh'>
                <Flex color="white" justify="center">
                    <Flex justify="space-between" align="center" w="full" p={2}>
                        <Link as={RouterLink} to="/" mx={4}>
                            <Button _hover={"transparent"} bg={"orange.medium"} color={"white"}>
                                Home
                            </Button>
                        </Link>
            {isMobile ? (
                <Menu >
                    <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<HamburgerIcon />}
                        variant='outline'
                    />
                    <MenuList mr={'8vh'}>
                        <Link as={RouterLink} to="/course/list" mx={4} >
                            <Button _hover={"transparent"}>
                                Courses
                            </Button>
                        </Link>
                        {/* <Link as={RouterLink} to="/about" mx={4}>
                            <Button _hover={"transparent"}>
                                About Us
                            </Button>
                        </Link> */}
                            <Link as={RouterLink} to="/contact" mx={4}  >
                                <Button _hover={"transparent"}>
                                    Contact
                                </Button>
                            </Link>
                        {/* <Link as={RouterLink} to="/tuner" mx={4} > */}
                            <Button _hover={"transparent"} mx={4}>
                                <a href="/tuner.html" rel="noopener noreferrer">
                                    Tuner
                                </a>
                                {/* Tuner */}
                            </Button>
                        {/* </Link> */}
                    </MenuList>
                </Menu>
            ) : (
                <Box display="flex" alignItems="center">
                    <Link as={RouterLink} to="/course/list" mx={4}>
                        <Button _hover={"transparent"}>
                            Courses
                        </Button>
                    </Link>
                    <Link as={RouterLink} to="/about" mx={4}>
                        <Button _hover={"transparent"}>
                            About Us
                        </Button>
                    </Link>
                    {user && (
                        <Link as={RouterLink} to="/contact" mx={4}>
                            <Button _hover={"transparent"}>
                                Contact
                            </Button>
                        </Link>
                    )}
                    <Button _hover={"transparent"} mx={4} >
                        <a href="/tuner.html" rel="noopener noreferrer">
                            Tuner
                        </a>
                    </Button>
                        {user && user.role === 'admin' && 
                            <Link as={RouterLink} to="/admin" mx={4}>
                                <Button _hover={"transparent"}>
                                    Admin
                                </Button>
                            </Link>
                        }
                </Box>
            )}
        </Flex>
                </Flex>
                {user && (
                    <Flex alignItems={"center"} gap={4}>
                        {/* <Link as={RouterLink} to={`/chat`}>
                            <BsFillChatQuoteFill size={20} />
                        </Link> */}
                        <Button size={"xs"} onClick={() => handleLogout()}>
                            <FiLogOut size={20} />
							</Button>
							<Link as={RouterLink} to={`/user/${user.username}`} mx={4}>
                                <RxAvatar size={24} />
                            </Link>
                    </Flex>
                )}

                {!user && (
                    <Flex>
                        <Button bg={"orange.medium"} color={"white"}>
                            <Link as={RouterLink} to="/signup">
                                Sign up
                            </Link>
                        </Button>

                        <Button bg={"transparent"}>
                            <Link as={RouterLink} to={"/login"}>
                                Login
                            </Link>
                        </Button>
                    </Flex>
                )}
            </Flex>
        </Container>
    );
};

export default Navbar;
