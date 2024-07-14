import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import UserHeader from "../components/UserHeader";
import Post from "../components/Post";
import { getPost, getUser } from "../libs/Methods";
import useShowToast from "../hooks/useShowToast";
import postsAtom from "../atoms/postsAtom";
import CreatePost from "../components/CreatePost";
const UserPage = () => {
    const { username } = useParams();
    const showToast = useShowToast();
    const [posts, setPosts] = useRecoilState(postsAtom);
    const [fetchingPosts, setFetchingPosts] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUser({ username });
                console.log('User Data:', userData);

                if (!userData.data || userData.data.length === 0) {
                    showToast("Error", "User not found", "error");
                    setUser(null);
                    setFetchingPosts(false);
                    return;
                }

                const user = userData.data[0];
                setUser(user);
                showToast("Success", "User found", "success");

                const postData = await getPost({ user_id: user._id });
                console.log('Post Data:', postData.data);

                if (postData.status === 204 || !postData.data) {
                    setPosts([]);
                    showToast("Info", "User has no posts", "info");
                } else {
                    setPosts(postData.data);
                }

                setFetchingPosts(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                showToast("Error", "Failed to fetch data", "error");
                setFetchingPosts(false);
            }
        };

        fetchData();
    }, [username, showToast, setPosts]);

    if (!user && !fetchingPosts) return <h1>User not found</h1>;

    return (
        <>
            {user && <UserHeader user={user} />}
            {fetchingPosts ? (
                <Flex justifyContent={"center"} my={12}>
                    <Spinner size={"xl"} />
                </Flex>
            ) : posts.length === 0 ? (
                <h1>User has no posts.</h1>
            ) : (
                posts.map((post) => (
                    <Post key={post._id} post={post} user={user} />
                ))
            )}
            <CreatePost />
        </>
    );
};

export default UserPage;
