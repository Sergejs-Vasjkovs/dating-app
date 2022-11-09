import React, { useEffect } from "react";
import PropTypes from "prop-types";
import NewCommentForm from "./NewCommentForm";
import Comment from "./Comment";
import { orderBy } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getComments, getCommentsLoadingStatus, loadCommentsList, removeComment } from "../../store/comments";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { getCurrentUserId } from "../../store/users";

const CommentsListComponent = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);
    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());
    const currentUserId = useSelector(getCurrentUserId());

    const handleAddComment = data => {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId
        };
        dispatch(createComment(comment));
    };

    const handleDeleteComment = id => {
        dispatch(removeComment(id));
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    if (!isLoading) {
        return (
            <>
                <div className="card mb-2">
                    <div className="card-body ">
                        <NewCommentForm onSubmit={handleAddComment} />
                    </div>
                </div>
                {sortedComments.length > 0 && (
                    <div className="card mb-3">
                        <div className="card-body ">
                            <h2>Comments</h2>
                            <hr />
                            {!isLoading ?
                                sortedComments.map(comment => <Comment
                                    key={comment._id}
                                    data={comment}
                                    onRemove={handleDeleteComment}
                                />) :
                                <p>Loading comments</p>}
                        </div>
                    </div>)}
            </>
        );
    }
};

CommentsListComponent.propTypes = {
    comment: PropTypes.string,
    comments: PropTypes.string
};

export default CommentsListComponent;
