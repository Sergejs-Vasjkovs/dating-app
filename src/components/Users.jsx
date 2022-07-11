import React, { useState } from 'react';
import api from "../api";
import "numeralize-ru";

const Users = () => {

    const [users, seUsers] = useState(() => api.users.fetchAll());

    const handleDelete = (userId) => {
        seUsers(prevState => prevState.filter((user => user._id !== userId)))
    };

    const handlePhrase = () => {

        const pluralize = require('numeralize-ru').pluralize;
        const human = pluralize(users.length, 'человек', 'человека', 'человек');
        const party = pluralize(users.length, 'тусанет', 'тусанут', 'тусанет');

        return (
            <h2>
                <span className={"badge " + (users.length > 0 ? "bg-primary" : "bg-danger")}>
                    {users.length > 0
                        ? `${users.length} ${human} ${party} с тобой сегодня`
                        : `Никто с тобой не тусанет`}
                </span>
            </h2>)
    };

    const renderTableRows = () => {
        return users.map((user) => {
            return (
                <tr key={user._id} className="align-middle">
                    <td>{user.name}</td>
                    <td>{user.qualities.map(q => <span key={q._id} className={`badge bg-${q.color} m-1`}> {q.name}</span >)}</td>
                    <td>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate}/5</td>
                    <td>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDelete(user._id)}>delete</button></td>
                </tr>)
        });
    };

    return (
        <>
            {handlePhrase()}
            {users.length !== 0 && (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col" className="col-2">Имя</th>
                            <th scope="col" className="col-3">Качества</th>
                            <th scope="col" className="col-2">Профессия</th>
                            <th scope="col" className="col-2">Встретился, раз</th>
                            <th scope="col" className="col-1">Оцента</th>
                            <th scope="col" className="col-1"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableRows()}
                    </tbody>
                </table>)}
        </>
    );
};

export default Users;