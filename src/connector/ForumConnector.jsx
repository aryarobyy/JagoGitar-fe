import instance from "../libs/instance";

export const getForum = async (forumId) => {
    return await instance.get(`/forum/${forumId}`)
}