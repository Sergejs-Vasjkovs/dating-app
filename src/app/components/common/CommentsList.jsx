import React from "react";
import PropTypes from "prop-types";
import NewCommentForm from "./NewCommentForm";
import Comment from "./Comment";
import { orderBy } from "lodash";
import { useComments } from "../../hooks/useComments";

const CommentsListComponent = () => {
    const { comments, createComment, isLoading, removeComment } = useComments();

    const handleAddComment = data => {
        createComment(data);
    };

    const handleDeleteComment = id => {
        console.log(id);
        removeComment(id);
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
                            {sortedComments.map(comment => <Comment
                                key={comment._id}
                                data={comment}
                                onRemove={handleDeleteComment}
                            />)}
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
