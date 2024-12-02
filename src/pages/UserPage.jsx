import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import UserHeader from "../components/UserHeader";
import Post from "../components/Post";
import useShowToast from "../hooks/useShowToast";
import postsAtom from "../atoms/postsAtom";
import CreatePost from "../components/CreatePost";
import LoginPage from "./auth/LoginPage"
import useGetUserProfile from "../hooks/useGetUserProfile";
import { getForum, getForumByUserId } from "../connector/ForumConnector";

const UserPage = () => {
    const {user} = useGetUserProfile();
    const showToast = useShowToast();
    const [posts, setPosts] = useRecoilState(postsAtom);
    useEffect(() => {
        const fetchData = async () => {
            if(!user) return;
            try {
                const postData = await getForumByUserId( user.userId );
                if (postData === 204 || !postData) {
                    setPosts([]);
                    showToast("Info", "User has no posts", "info");
                } else {
                    setPosts(postData);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                showToast("Error", "Failed to fetch data", "error");
            }
        };

        fetchData();
    }, [ showToast, setPosts, user]);

    if (!user) return <h1>User not found</h1>;

    return (
        <>
            {!user ? (
                <LoginPage />
            ) : (
                <>
                    <UserHeader user={user} />
                    <CreatePost />
                </>
            )}
            {posts.length === 0 ? (
                <h1>User has no posts.</h1>
            ) : (
                posts
                .slice() 
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((post) => (
                    <Post key={post.forumId} post={post} user={user} />
                ))
            )}
        </>
    );
};

export default UserPage;
