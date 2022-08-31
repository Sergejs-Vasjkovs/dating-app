import React from "react";
import { useParams } from "react-router-dom";
import UsersList from "../UsersList";
import UserPage from "../UserPage";

const Users = () => {
    const params = useParams();
    const { userId } = params;
    return <>{userId ? <UserPage userId={userId} /> : <UsersList />}</>;
};

export default Users;
