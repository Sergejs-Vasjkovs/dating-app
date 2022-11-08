import React from "react";
import PropTypes from "prop-types";
import { displayPostTime } from "../../utils/displayPostTime";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUserById } from "../../store/users";

const CommentComponent = ({ data, onRemove }) => {
    const currentUserId = useSelector(getCurrentUserId());
    const user = useSelector(getUserById(data.userId));
    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <img
                            src={user.image}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {user.name} <span className="small">
                                            - {displayPostTime(data.created_at)}
                                        </span>
                                    </p>
                                    {currentUserId === data.userId &&
                                        <button className="btn btn-sm text-primary d-flex align-items-center"
                                            onClick={() => onRemove(data._id)}>
                                            <i className="bi bi-x-lg"></i>
                                        </button>}
                                </div>
                                <p className="small mb-0">{data.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

CommentComponent.propTypes = {
    data: PropTypes.object,
    onRemove: PropTypes.func
};

export default CommentComponent;
