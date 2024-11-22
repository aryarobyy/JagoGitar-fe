import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import Actions from "../components/Actions";
import { useEffect, useState } from "react";
import Comment from "../components/Comment";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { DeleteIcon } from "@chakra-ui/icons";
import { getPost, deletePost, getUser } from "../libs/Methods";

const PostPage = () => {
    const { pid, username } = useParams();  
    const { user } = useGetUserProfile();
    const [post, setPost] = useState(null); 
    const [postAuthor, setPostAuthor] = useState(null);
    const showToast = useShowToast();
    const navigate = useNavigate();
    const loggedInUser = useRecoilValue(userAtom);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postResponse = await getPost({ _id: pid });
                if (postResponse.error) {
                    showToast("Error", postResponse.error, "error");
                    return;
                }
    
                const post = postResponse.data[0];
                setPost(post);
                
                // Extract user_id from the post
                const userId = post.user_id;
                if (!userId) {
                    showToast("Error", "No user ID found in post", "error");
                    return;
                }
    
                // Fetch user details for the user_id
                const userResponse = await getUser({ _id: userId });
                if (userResponse.error) {
                    showToast("Error", userResponse.error, "error");
                    return;
                }

                const user = userResponse.data[0];
                if (!user) {
                    showToast("Error", "User not found", "error");
                    return;
                }

                setPostAuthor(user); 
    
            } catch (error) {
                showToast("Error", error.message, "error");
            }
        };
    
        fetchPost();
    }, [pid, showToast]);
    

    const handleDeletePost = async () => {
        try {
            if (!window.confirm("Are you sure you want to delete this post?")) return;
            const deleteResponse = await deletePost({ _id: pid });
            if (deleteResponse.error) {
                showToast("Error", deleteResponse.error, "error");
                return;
            }
            showToast("Success", "Post deleted", "success");
            navigate(`/${user && user[0] ? user[0].username : ''}`);
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    if (!post) return (
        <Flex justifyContent="center" alignItems="center" height="100vh">
            <Spinner size="xl" />
        </Flex>
    );

    const postDate = new Date(post.createdAt);
    const formattedDate = isNaN(postDate) ? "Invalid date" : formatDistanceToNow(postDate);

    return (
        <Box p={4}>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Flex alignItems="center" gap={3}>
                    <Avatar src={postAuthor?.profilePic} size="md" name={postAuthor?.username} />
                    <Flex flexDirection="column">
                        <Text fontSize="sm" fontWeight="bold">{postAuthor?.username || "Unknown User"}</Text>
                        <Image src='/verified.png' w={4} h={4} />
                    </Flex>
                </Flex>
                <Flex gap={4} alignItems="center">
                    <Text fontSize="xs" width={36} textAlign="right" color="gray.light">
                        {formattedDate} ago
                    </Text>
                    {loggedInUser?._id === post.user_id && (
                        <DeleteIcon size={20} cursor="pointer" onClick={handleDeletePost} />
                    )}
                </Flex>
            </Flex>

            <Text my={3}>{post.text}</Text>

            {post.img && (
                <Box borderRadius={6} overflow="hidden" border="1px solid" borderColor="gray.light" mb={3}>
                    <Image src={post.img} w="full" />
                </Box>
            )}

            <Divider my={4} />

            <Flex justifyContent="space-between" alignItems="center" my={4}>
                <Flex gap={2} alignItems="center">
                    <Text fontSize="2xl">👋</Text>
                    <Text color="gray.light">Get the app to like, reply, and post.</Text>
                </Flex>
                <Button>Get</Button>
            </Flex>

            <Divider my={4} />

            {post.replies && post.replies.map((reply) => (
                <Comment
                    key={reply._id}
                    reply={reply}
                    lastReply={reply._id === post.replies[post.replies.length - 1]._id}
                />
            ))}
        </Box>
    );
};

export default PostPage;
