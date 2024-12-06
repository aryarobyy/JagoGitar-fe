import instance from "../libs/instance";

export const registerUser = async (data) => {
    try {
        const response = await instance.post('/user/register', data);
        console.log("Regis", response.data.data)
        return response.data.data;
    } catch (e) {
        console.error(e, "Error in registerUser API");
        throw e;
    }
};

export const loginUser = async (data) => {
    try {
        const response = await instance.post('/user/login',data);
        return response.data.data;
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

export const changeUser = async (userId, data) => {
    try{
        const response = await instance.put(`/user/${userId}`, data)
        console.log("Change user api:",response.data.data)
        return response.data.data;
    } catch (e){
        console.error(e, "Error in changeUser API");
        throw e
    }
}

export const getAllUser = async () => {
    const res = await instance.get(`/user/all`)
    return res.data.data
}

export const delUser = async (userId) => {
    const res = await instance.delete(`/user/${userId}`)
    return res.data
}