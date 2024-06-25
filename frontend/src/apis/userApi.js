import axios from "axios";

export const registerUser = async ({ name, email, password }) => {
    try {
        const { data } = await axios.post("/api/user/register", {
            name,
            email,
            password,
        });

        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
}

export const loginUser = async ({ email, password }) => {
    try {
        const { data } = await axios.post("/api/user/login", {
            email,
            password,
        });

        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
}

export const getUserProfile = async ({ token }) => {
    try {
        const { data } = await axios.get("/api/user/profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
}

export const updateProfile = async ({ token, userData, userId }) => {
    try {
        const { data } = await axios.put(`/api/user/updateProfile/${userId}`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
}

export const updateProfilePicture = async ({ token, formData }) => {
    try {
        const { data } = await axios.put("/api/user/updateProfilePicture", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
}