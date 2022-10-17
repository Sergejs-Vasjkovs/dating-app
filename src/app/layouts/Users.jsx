import React from "react";
import { useParams } from "react-router-dom";
import EditUserPage from "../components/page/editPage/EditUserPage";
import UsersListPage from "../components/page/userListPage";
import UserPage from "../components/page/userPage";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    return <>
        <UserProvider>
            {userId ? (edit ? <EditUserPage /> : <UserPage userId={userId} />) : (<UsersListPage />)}
        </UserProvider>
    </>;
};

export default Users;
