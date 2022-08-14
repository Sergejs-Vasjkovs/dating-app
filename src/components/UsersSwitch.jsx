import React, { useEffect, useState } from "react";
import Users from "../components/Users";
import User from "../components/layouts/User";
import { useParams } from "react-router-dom";
import api from "../api";

const UsersSwitch = () => {
    const params = useParams();
    const { userId } = params;

    useEffect(() => {
        api.users.getById(userId).then(data => setUser(data));
    }, []);

    const [user, setUser] = useState();

    return <>
        {user ? <User user={user} /> : <Users />}
    </>;
};

export default UsersSwitch;
