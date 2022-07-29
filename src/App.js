import React, { useState, useEffect } from "react";
import Users from "./components/Users";
import api from "./api";

function App() {
    const [users, seUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then(data => seUsers(data));
    }, []);

    const handleDelete = (userId) => {
        const newUsers = users.filter((user) => user._id !== userId);
        seUsers(newUsers);
    };

    return (
        <>
            {users && <Users users={users} onDelete={handleDelete} />}
        </>
    );
}

export default App;
