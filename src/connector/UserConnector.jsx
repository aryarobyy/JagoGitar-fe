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

export const fetchUserById = async (userId) => {
    try {
      const res = await fetch(`/api/user/${userId}`); 
      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      console.log("Data by Id",data)
      return data.user; 
    } catch (error) {
      console.error("Error fetching user:", error.message);
      return null;
    }
  };
  