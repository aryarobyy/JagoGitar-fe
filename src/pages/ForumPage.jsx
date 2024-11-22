import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import { getPost } from "../libs/Methods";
import useGetUserProfile from "../hooks/useGetUserProfile";

const ForumPage = () => {
    const { pid } = useParams();  // Get the post ID from URL parameters
    const [posts, setPosts] = useRecoilState(postsAtom);
    const showToast = useShowToast();
    const { user, loading} = useGetUserProfile();

    console.log("Ini user: ",user)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postResponse = await getPost({ _id: pid });
                console.log("Post Response: ", postResponse.data);
                if (postResponse.error) {
                    showToast("Error", postResponse.error, "error");
                    return;
                }
                // if (Array.isArray(postResponse.data)) {
                //     setPosts(postResponse.data);
                // } 
                setPosts(Array.isArray(postResponse.data) ? postResponse.data : [postResponse.data]);
            } catch (error) {
                showToast("Error", error.message, "error");
                // setLoading(false);
            }
        };
        fetchPost();
    }, [pid, showToast, setPosts]);

    if (loading) {
        return (
            <Flex justify='center' align='center' h='100vh'>
                <Spinner size='xl' />
            </Flex>
        );
    }

    return (
        <Flex gap='10' alignItems={"flex-start"}>
            <Box flex={70}>
                {posts.length === 0 ? (
                    <h1>No posts available</h1>
                ) : (
                    posts.map((post) => (
                        <Post key={post._id} post={post} user={user} />
                    ))
                )}
            </Box>
            <Box
                flex={30}
                display={{
                    base: "none",
                    md: "block",
                }}
            >
            </Box>
        </Flex>
    );
};

export default ForumPage;
