import instance from "../libs/instance";

export const postForum = async (data) => {
    const res = await instance.post("/forum/post", data)
    console.log("Post Forum: ",res.data.data)
    return res.data.data
}

export const getAllForum = async () => {
    const res = await instance.get("/forum/all")
    return res.data.data
}

export const getForum = async (forumId) => {
    const res = await instance.get(`/forum/${forumId}`)
    return res.data.data
}

export const getForumByUserId = async (userId) => {
    const res = await instance.get(`/forum/user/${userId}`)
    return res.data.data
}

export const deleteForum = async (forumId) => {
    const res = await instance.delete(`/forum/${forumId}`)
    console.log("Delete forum: ", res.data)
    return res.data
}