import instance from "../libs/instance";

export const registerUser = async (data) => {
    try {
        const response = instance.post('/user/register', data);
        return response.data.user;
    } catch (e) {
        console.error(e, "Error in registerUser API");
        throw e;
    }
};

export const loginUser = async (data) => {
    try {
        const response = await instance.post('/user/login',data);
        return response.data.user;
    } catch (e) {
        console.error(e, "Error in loginUser API");
        throw e; 
    }
};

export const getUserById = async (userId) => {
    try {
        const response = await instance.get(`/user/${userId}`);
        return response.data.user; 
    } catch (e) {
        console.error(e, "Error in getUserById API");
        throw e; 
    }
};

export const changeUser = async (userId, updatedData) => {
    try{
        const response = await instance.put(`/user/${userId}`, updatedData)
        console.log("Change user api:",response.data.updatedUser)
        return response.data.updatedUser;
    } catch (e){
        console.error(e, "Error in changeUser API");
        throw e
    }
}