import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Link, Text, VStack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import { Button, useToast } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Link as RouterLink } from "react-router-dom";
// import follow from "../hooks/useFollowUnfollow";
import CustomButton from "../utils/CustomButton";
// import UserLiked from "./UserLiked";
import { useState, useEffect } from "react";
import { FaInstagram } from "react-icons/fa"; 

const UserHeader = ({user}) => {
    const toast = useToast();
    const currentUser = user ;
    const my_id = localStorage.getItem("user_id")
    const [following,setFollowing] = useState(false)
    const [activeTab, setActiveTab] = useState("posts","likes");
    // getFollow({ user_id: my_id,following: user._id }).then((data) => {
    //     if(data.status == 200) setFollowing(true)
    // })

    // useEffect(() => {
        // if (user && user.userId) {
        //     getFollow({ user_id: my_id, following: user.userId }).then((data) => {
        //         if (data.status === 200) setFollowing(true);
        //     });
        // }
    // }, [user]);

    // const handleFollow = () => {
    //     follow(currentUser,my_id,setFollowing)
    // }

    const copyURL = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(() => {
            toast({
                title: "Success.",
                status: "success",
                description: "Profile link copied.",
                duration: 3000,
                isClosable: true,
            });
        });
    };

    if (!currentUser) {
        return <Text>Loading...</Text>;
    }

    return (
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                        {currentUser.name}
                    </Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"}>{currentUser.username}</Text>
                        <Text fontSize={"xs"} bg={"orange.medium"} color={"gray.light"} p={1} borderRadius={"full"}>
                            JagoGitar.net
                        </Text>
                    </Flex>
                </Box>
                <Box>
                    {currentUser.userPP && (
                        <Avatar
                            name={user.name}
                            src={user.userPP}
                            size={{
                                base: "md",
                                md: "xl",
                            }}
                        />
                    )}
                    {!currentUser.userPP && (
                        <Avatar
                            name={user.username}
                            src='https://bit.ly/broken-link'
                            size={{
                                base: "md",
                                md: "xl",
                            }}
                        />
                    )}
                </Box>
            </Flex>

            <Text>{user.bio}</Text>

            {currentUser.userId === my_id && (
                <Link as={RouterLink} to={`/update/${currentUser.userId}`}>
                    <Button size={"sm"}>Update Profile</Button>
                </Link>
            )}
            {/* {currentUser.userId !== my_id && (
                <Button size={"sm"} onClick={() => handleFollow()}>
                    {following ? "Unfollow" : "Follow"}
                </Button>
            )} */}
            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    {/* <Text color={"gray.light"}>{user.followers.length} followers</Text> */}
                    <Box w='1' h='1' bg={"gray.light"} borderRadius={"full"}></Box>
                    <Link color={"gray.light"}><FaInstagram /></Link>
                </Flex>
                <Flex>
                    <Box className='icon-container'>
                        <BsInstagram size={24} cursor={"pointer"} />
                    </Box>
                    <Box className='icon-container'>
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={"pointer"} />
                            </MenuButton>
                            <Portal>
                                <MenuList bg={"gray.dark"}>
                                    <MenuItem bg={"gray.dark"} onClick={copyURL}>
                                        Copy link
                                    </MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Flex>
            </Flex>

            <Flex w={"full"}>
                <Flex
                    flex={1}
                    justifyContent={"center"}
                    pb='3'
                    cursor={"pointer"}
                    onClick={() => setActiveTab("posts")}
                >
                    <CustomButton fontWeight={"bold"}>Posts</CustomButton>
                </Flex>
                <Flex
                    flex={1}
                    justifyContent={"center"}
                    color={"gray.light"}
                    pb='3'
                    cursor={"pointer"}
                    onClick={() => setActiveTab("likes")}
                >
                    <CustomButton fontWeight={"bold"}> Likes </CustomButton>
                </Flex>
            </Flex>

            {/* {activeTab === "posts" && <Post />} */}
            {activeTab === "likes" && <UserLiked />}
        </VStack>
    );
};

export default UserHeader;
