import instance from "../libs/instance";

export const addCourse = async (data) => {
    const res = await instance.post("/course/post", data)
    console.log("Post Course: ", res.data.data)
    return res.data.data
}

export const getCourse = async (courseId) => {
    const res = await instance.get(`/course/${courseId}`)
    console.log("Get Course: ", res.data.data)
    return res.data.data
}

export const getAllCourse = async () => {
    try{
        const res = await instance.get("/course/all")
        console.log("Get All Course: ", res.data.data)
        return res.data.data
    } catch (e) {
        console.log("Error: ", e)
    }
}