import axios from "axios";

export const createNewComment = async ({ token, desc, slug, parent, replyOnUser }) => {
    try {
        const { data } = await axios.post("/api/comment",
            {
                desc,
                slug,
                parent,
                replyOnUser,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
}

export const updateComment = async ({ token, desc, check, commentId }) => {
    try {
        const { data } = await axios.put(`/api/comment/${commentId}`,
            {
                desc,
                check,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
}

export const deleteComment = async ({ token, commentId }) => {
    try {
        const { data } = await axios.delete(`/api/comment/${commentId}`,
            {
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