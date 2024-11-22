import React from 'react';
import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Link, useNavigate } from "react-router-dom";
// import Actions from "./Actions";
import { formatDistanceToNow, isValid, parseISO } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";

const Post = ({ post, user }) => {
    const currentUser = useRecoilValue(userAtom);
    const navigate = useNavigate();
    const showToast = useShowToast();

    if (!post || !post.createdAt) {
        return null; // Or a loading state, e.g., <Text>Loading...</Text>
    }

    const handleDeletePost = (postId) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        deletePost({ id: postId })
            .then(() => {
                showToast("Success", "Post deleted", "success");
                setPosts(posts.filter((p) => p._id !== postId));
            })
            .catch(error => {
                showToast("Error", error.message, "error");
            });
    };

    const postDate = parseISO(post.createdAt);
    const timeAgo = isValid(postDate) ? formatDistanceToNow(postDate) : 'Invalid date';

    return (
        <Link to={`/${user?.username}/post/${post._id}`}>
            <Flex gap={3} mb={4} py={5}>
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Avatar
                        size='md'
                        name={user?.name}
                        src={user?.profilePic}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/${user?.username}`);
                        }}
                    />
                    <Box w='1px' h={"full"} bg='gray.light' my={2}></Box>
                    <Box position={"relative"} w={"full"}>
                        {post.replies?.length === 0 && <Text textAlign={"center"}>🥱</Text>}
                        {post.replies?.[0] && (
                            <Avatar
                                size='xs'
                                name='John Doe'
                                src={post.replies[0].userProfilePic}
                                position={"absolute"}
                                top={"0px"}
                                left='15px'
                                padding={"2px"}
                            />
                        )}
                        {post.replies?.[1] && (
                            <Avatar
                                size='xs'
                                name='John Doe'
                                src={post.replies[1].userProfilePic}
                                position={"absolute"}
                                bottom={"0px"}
                                right='-5px'
                                padding={"2px"}
                            />
                        )}
                        {post.replies?.[2] && (
                            <Avatar
                                size='xs'
                                name='John Doe'
                                src={post.replies[2].userProfilePic}
                                position={"absolute"}
                                bottom={"0px"}
                                left='4px'
                                padding={"2px"}
                            />
                        )}
                    </Box>
                </Flex>
                <Flex flex={1} flexDirection={"column"} gap={2}>
                    <Flex justifyContent={"space-between"} w={"full"}>
                        <Flex w={"full"} alignItems={"center"}>
                            <Text
                                fontSize={"sm"}
                                fontWeight={"bold"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/${user.username}`);
                                }}
                            >
                                {user?.username}
                            </Text>
                            <Image src='/verified.png' w={4} h={4} ml={1} />
                        </Flex>
                        <Flex gap={4} alignItems={"center"}>
                            <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
                                {timeAgo} ago
                            </Text>

                            {currentUser?._id === user?._id && (
                                <DeleteIcon size={20} onClick={() => handleDeletePost(post._id)} />
                            )}
                        </Flex>
                    </Flex>

                    <Text fontSize={"sm"}>{post.text}</Text>
                    {post.img && (
                        <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                            <Image src={post.img} w={"full"} />
                        </Box>
                    )}

                    {/* <Flex gap={3} my={1}> //belum terpakai
                        <Actions post={post} />
                    </Flex> */}
                </Flex>
            </Flex>
        </Link>
    );
};

export default Post;
