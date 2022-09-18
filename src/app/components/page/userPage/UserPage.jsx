import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api/";
import UserInfoCard from "../../common/user/UserInfoCard";
import UserQualitiesCard from "../../common/user/UserQualitiesCard";
import UserMeetingsCard from "../../common/user/UserMeetingsCard";
import CommentsListComponent from "../../common/CommentsListComponent";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then(data => setUser(data));
    }, []);

    if (user) {
        return (<div className="container">
            <div className="row gutters-sm">

                <div className="col-md-4 mb-3">
                    <UserInfoCard
                        id={user._id}
                        name={user.name}
                        profession={user.profession.name}
                        rate={user.rate}
                    />
                    <UserQualitiesCard
                        qualities={user.qualities}
                    />
                    <UserMeetingsCard
                        value={user.completedMeetings} />
                </div>

                <div className="col-md-8">
                    <CommentsListComponent />
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
