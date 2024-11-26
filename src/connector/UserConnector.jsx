import instance from "../libs/instance";

export const registerUser = async (data) => {
    try {
        const response = instance.post('/user/register', data);
        return response.data;
    } catch (e) {
        console.error(e, "Error in registerUser API");
        throw e;
    }
};

export const loginUser = async (data) => {
    try {
        const response = await instance.post('/user/login',data);
        console.log("Data:", response.data.user)
        return response.data.user;
    } catch (e) {
        console.error(e, "Error in loginUser API");
        throw e; 
    }
};

export const getUserById = async (userId) => {
    try {
        const response = await instance.get(`/user/${userId}`);
        console.log("response data",response)
        return response.data; 
    } catch (e) {
        console.error(e, "Error in getUserById API");
        throw e; 
    }
};
