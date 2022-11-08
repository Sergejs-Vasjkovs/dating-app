import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import commentService from "../services/comment.service";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
    const { userId } = useParams();
    const currentUserId = useSelector(getCurrentUserId());
    const [isLoading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getComments();
    }, [userId]);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    const createComment = async (data) => {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId
        };
        try {
            const { content } = await commentService.createComment(comment);
            setComments(prevState => ([...prevState, content]));
        } catch (error) {
            errorCatcher(error);
        }
    };

    const getComments = async () => {
        try {
            // console.log(userId);
            const { content } = await commentService.getComments(userId);
            setComments(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    };

    const errorCatcher = (error) => {
        const { message } = error.response.data;
        setError(message);
    };

    const removeComment = async (id) => {
        console.log(id);
        try {
            const { content } = await commentService.removeComment(id);
            if (content === null) {
                setComments(prevState => prevState.filter(comment => comment._id !== id));
            }
            console.log(content);
        } catch (error) {
            errorCatcher(error);
        }
    };

    return (
        <CommentsContext.Provider value={{ comments, createComment, isLoading, removeComment }}>
            {children}
        </CommentsContext.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
