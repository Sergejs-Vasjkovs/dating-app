import React from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import UsersList from "../UsersList";
import UserPage from "../UserPage";

const Users = () => {
    const params = useParams();
    const { userId } = params;
    return <>{userId ? <UserPage userId={userId} /> : <UsersList />}</>;
};

Users.propTypes = {
    user: PropTypes.object.isRequired
};

export default Users;
