import React from "react";
import PropTypes from "prop-types";
import QualitiesList from "../QualitiesList";
import { useHistory } from "react-router-dom";

const User = ({ user }) => {
    const history = useHistory();

    const handleBack = () => {
        history.replace("/users");
    };

    return (
        <div className="m-3">
            <h2>{user.name}</h2>
            <h3>{user.profession.name}</h3>
            <p><QualitiesList qualities={user.qualities} /></p>
            <p>Completed meetings: {user.completedMeetings}</p>
            <p>Rate: {user.rate}</p>
            <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleBack()}>
                Back
            </button>
        </div >
    );
};

User.propTypes = {
    user: PropTypes.object.isRequired
};

export default User;
