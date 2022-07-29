import React, { useState } from "react";
import Users from "./components/Users";
import api from "./api";

function App() {
    const [users, seUsers] = useState(() => api.users.fetchAll());

    const handleDelete = (userId) => {
        const newUsers = users.filter((user) => user._id !== userId);
        seUsers(newUsers);
    };

    return (
        <>
            <Users users={users} onDelete={handleDelete} />
        </>
    );
}

export default App;
