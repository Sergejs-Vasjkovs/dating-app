import React from "react";
import PropTypes from "prop-types";
import UserInfoCard from "../../common/user/UserInfoCard";
import UserQualitiesCard from "../../common/user/UserQualitiesCard";
import UserMeetingsCard from "../../common/user/UserMeetingsCard";
import CommentsList from "../../common/CommentsList";
import { CommentsProvider } from "../../../hooks/useComments";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";

const UserPage = ({ userId }) => {
    const user = useSelector(getUserById(userId));
    if (user) {
        return (<div className="container">
            <div className="row gutters-sm">

                <div className="col-md-4 mb-3">
                    <UserInfoCard user={user} />
                    <UserQualitiesCard qualities={user.qualities} />
                    <UserMeetingsCard value={user.completedMeetings} />
                </div>

                <div className="col-md-8">
                    <CommentsProvider>
                        <CommentsList />
                    </CommentsProvider>
                </div>
            </div>
        </div >);
    } else {
        return <h2 className="text-center">Loading...</h2>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
