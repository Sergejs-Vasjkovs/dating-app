import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import NewCommentForm from "./NewCommentForm";
import CommentComponent from "./CommentComponent";
import api from "../../api/index";
import { orderBy } from "lodash";

const CommentsListComponent = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState();

    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then(data => setComments(data));
    }, []);

    const handleAddComment = data => {
        api.comments.add({ ...data, pageId: userId })
            .then(data => setComments([...comments, data]));
    };

    const handleDeleteComment = id => {
        api.comments.remove(id).then(id => {
            setComments(comments.filter(comment => comment._id !== id));
        });
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

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
                        {sortedComments.map(comment => <CommentComponent
                            key={comment._id}
                            data={comment}
                            onRemove={handleDeleteComment}
                        />)}
                    </div>
                </div>)}
        </>
    );
};

CommentsListComponent.propTypes = {
    comment: PropTypes.string,
    comments: PropTypes.string
};

export default CommentsListComponent;
