import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { getAllForum, getForum } from "../connector/ForumConnector";
import LoginPage from "./auth/LoginPage";
import { getUserById } from "../connector/UserConnector";

const ForumPage = () => {
    const { forumId } = useParams();
    const [posts, setPosts] = useRecoilState(postsAtom);
    const [userData, setUserData] = useState({});
    const showToast = useShowToast();
    const { user, loading} = useGetUserProfile();
    const userIds = posts.map(post => post.userId);
    console.log("user id", user)
    
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const forumData = await getAllForum(); 

                if (!forumData) {
                    setPosts([]);
                    showToast("Info", "Forum not found", "info");
                } else {
                    setPosts(forumData);
                }
            } catch (error) {
                console.error("Error fetching forum:", error);
                showToast("Error", error.message, "error");
            }
        };
        fetchPost();
    }, [forumId, showToast, setPosts]);

    useEffect(() => {
        const fetchUser = async () => {
            if(userIds.length < 0)return;
            try{
                const users = await getUserById(userIds);
                const usersMap = users.reduce((map, user) => {
                    map[user.id] = user;
                    return map;
                }, {})
                setUserData(usersMap);
            }catch(e){
                console.error("Error fetching user data:", e);
                    showToast("Error", "Failed to fetch user data", "error");
            }
        }
        fetchUser();
    }, [userIds, showToast])

    if (!user) {
        return <LoginPage />;
    }
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
                    posts
                    .slice() 
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((post) => (
                        <Post key={post.forumId} post={post} user={userData[post.userId]}/>
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
