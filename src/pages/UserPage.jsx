import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import UserHeader from "../components/UserHeader";
import Post from "../components/Post";
import useShowToast from "../hooks/useShowToast";
import postsAtom from "../atoms/postsAtom";
import CreatePost from "../components/CreatePost";
import LoginPage from "./auth/LoginPage"
import { getForumByUserId } from "../connector/ForumConnector";
import { getUserByUsername } from "../connector/UserConnector";
import { useParams } from "react-router-dom";

const UserPage = () => {
    const { username } = useParams()
    const showToast = useShowToast();
    const [posts, setPosts] = useRecoilState(postsAtom);
    const [user, setUser ] = useState(null)
    useEffect(() => {
        const fetchUser = async () => {
            try{
                const data = await getUserByUsername(username)
                setUser(data)
            } catch (error) {
                console.error('Error fetching user data:', error);
                showToast("Error", "Failed to fetch user data", "error");
            }
        }
        fetchUser()
    }, [username, showToast])
    
    useEffect(() => {
        const fetchData = async () => {
            if (!user || !user.userId) return; 
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
    }, [ user, showToast, setPosts]);

    if (user === null) return <h1>Loading user...</h1>;
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
