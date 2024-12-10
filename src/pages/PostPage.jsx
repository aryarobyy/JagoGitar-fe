import { Avatar, Box, Button, Divider, Flex, Image, Input, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Comment from "../components/Comment";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { deleteForum, getForum, postComment } from "../connector/ForumConnector";
import { getUserById } from "../connector/UserConnector";
import { IoSendSharp } from "react-icons/io5";

const PostPage = () => {
    const { forumId } = useParams();
    const { user } = useGetUserProfile();
    const [post, setPost] = useState(null);
    const [postAuthor, setPostAuthor] = useState(null);
    const showToast = useShowToast();
    const navigate = useNavigate();
    const loggedInUser = useRecoilValue(userAtom);
    const [comment, setComment] = useState([])
    const [commentData, setCommentData] = useState([])
    const [inputs, setInputs] = useState({
        title: "",
        text: "",
    });
    const userIds = comment?.replies?.map(reply => reply.userId) || [];
    console.log("Comment data", commentData)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getForum(forumId);
                setPost(data);
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                
                setComment(data.replies || []);
            } catch (e) {
                console.log("Error getting forum data :", e);
            }
        };
        fetchPost();
    }, [forumId, showToast]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = post?.userId;
                const userData = await getUserById(userId);
                setPostAuthor(userData);
                
                if (userData.error) {
                    showToast("Error", userData.error, "error");
                    return;
                }
    
                const replyUserIds = post.replies ? 
                    [...new Set(post.replies.map(reply => reply.userId).filter(id => id))] 
                    : [];
    
                if (replyUserIds.length === 0) return;
    
                const commentByData = await Promise.all(
                    replyUserIds.map(id => getUserById(id))
                );
    
                const usersMap = {
                    [userId]: userData, 
                    ...commentByData.reduce((map, user) => {
                        if (user && user.userId) {
                            map[user.userId] = user;
                        }
                        return map;
                    }, {})
                };
    
                setCommentData(usersMap);
            } catch (e) {
                console.error("Error fetching user: ", e);
            }
        };
    
        if (post) fetchUser();
    }, [post, showToast]);



    const handlePostComment = async () => {
        const commentData = { ...inputs, forumId, userId: loggedInUser.userId };
        try {
            const data = await postComment(commentData);
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            setComment((prevComments) => [...prevComments, data]);
            setInputs({ ...inputs, text: "" });
            window.location.reload()
        } catch (e) {
            console.error("Failed to post comment", e);
        }
    };

    const handleDeletePost = async () => {
        try {
            if (!window.confirm("Are you sure you want to delete this post?")) return;
            const res = await deleteForum(forumId);
            if (res.error) {
                showToast("Error", res.error, "error");
                return;
            }
            showToast("Success", "Post Deleted", "success");
            navigate(`/user/${user.username}`);
        } catch (e) {
            console.error(e);
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
                    <Avatar src={postAuthor?.userPP} size="md" name={postAuthor?.username} />
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
                        <RiDeleteBin5Line size={20} cursor="pointer" onClick={handleDeletePost} />
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
            <Flex gap={2} alignItems="center" mb={4}>
                <Input
                    placeholder="Tambahkan komentar..."
                    variant="outline"
                    size="md"
                    onChange={(e) =>
                        setInputs((prev) => ({
                            ...prev,
                            text: e.target.value,
                        }))
                    }
                    value={inputs.text}
                />
                <Button onClick={handlePostComment}><IoSendSharp /></Button>
            </Flex>
            {post.replies && post.replies.map((reply, index) => (
                <Comment
                    comment={{
                        ...reply,
                        userPP: commentData[reply.userId]?.userPP,
                        username: commentData[reply.userId]?.username
                    }}
                    postAuthor={postAuthor}
                    lastReply={index === post.replies.length - 1}
                    key={reply.commentId || index}
                />
            ))}
        </Box>
    );
};

export default PostPage;
