import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";
import Qualities from "../../ui/qualities";
import api from "../../../api/";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then(data => setUser(data));
    }, []);

    const history = useHistory();

    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };

    if (user) {
        return <div className="m-3">
            <h2>{user.name}</h2>
            <h3>Profession: {user.profession.name}</h3>
            <Qualities qualities={user.qualities} />
            <p>Completed meetings: {user.completedMeetings}</p>
            <p>Rate: {user.rate}</p>
            <Link to={`/users/${user._id}/edit`}>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleClick()}>
                    Change user
                </button>
            </Link>
        </div>;
    } else {
        return <h2 className="text-center">Loading...</h2>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
