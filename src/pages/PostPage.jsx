import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text } from "@chakra-ui/react";
// import Actions from "../components/Actions";
import { useEffect, useState } from "react";
import Comment from "../components/Comment";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteForum, getForum } from "../connector/ForumConnector";
import { getUserById } from "../connector/UserConnector";

const PostPage = () => {
    const { forumId } = useParams();  
    const { user } = useGetUserProfile();
    const [post, setPost] = useState(null); 
    const [postAuthor, setPostAuthor] = useState(null);
    const showToast = useShowToast();
    const navigate = useNavigate();
    const loggedInUser = useRecoilValue(userAtom);
    useEffect(() => {
        const fetchPost = async () => {
            try{
                const forumData = await getForum(forumId);
                if(forumData.error) {
                    showToast("Error", data.error, "error");
                    return;
                    }
                    setPost(forumData);

                const userId = forumData.userId;
                const userData = await getUserById(userId);
                if(userData.error) {
                    showToast("Error", data.error, "error");
                    return;
                    }
                setPostAuthor(userData)
            } catch (e){
                console.error(e)
            }
        }
        fetchPost()
    }, [forumId, showToast])

    const handleDeletePost = async () => {
        try{
            if (!window.confirm("Are you sure you want to delete this post?")) return;
            const res = await deleteForum(forumId);
            console.log(res)
            if(res.error) {
                showToast("Error", res.error, "error");
                return;
                }
            showToast("Success", "Post Deleted", "Success")
            navigate(`/user/${user.username}`)
        }catch(e){
            console.error(e)
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
                    {loggedInUser?.userId === post.userId && (
                        <DeleteIcon size={20} cursor="pointer" onClick={handleDeletePost} />
                    )}
                </Flex>
            </Flex>

            <Text my={3}>{post.text}</Text>

            {post.imgUrl && (
                <Box borderRadius={6} overflow="hidden" border="1px solid" borderColor="gray.light" mb={3}>
                    <Image src={post.imgUrl} w="full" />
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
