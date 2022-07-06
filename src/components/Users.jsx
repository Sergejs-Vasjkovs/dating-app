import React, { useState } from 'react';
import api from "../api";
import "numeralize-ru";



const Users = () => {

    const [users, seUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        seUsers(prevState => prevState.filter((user => user._id !== userId)))
    };

    const handlePhrase = () => {

        const usersLength = users.length;

        const pluralize = require('numeralize-ru').pluralize;
        const human = pluralize(usersLength, 'человек', 'человека', 'человек');
        const party = pluralize(usersLength, 'тусанет', 'тусанут', 'тусанет');

        return usersLength !== 0 ?
            (<h2>
                <span className="badge bg-primary">
                    {`${usersLength} ${human} ${party} с тобой сегодня`}
                </span>
            </h2>)
            :
            (<h2>
                <span className="badge bg-danger">
                    Никто с тобой не тусанет
                </span>
            </h2>)
    };

    const renderTableRows = () => {
        return users.map((user) => {
            return (
                <tr key={user._id} className="align-middle">
                    <td>{user.name}</td>
                    <td>{renderQualitiesRow(user.qualities)}</td>
                    <td>{renderProfessionRow(user.profession)}</td>
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

    const renderQualitiesRow = (qualities) => qualities.map(q => {
        const className = `badge bg-${q.color} m-1`;
        return (<span key={q._id} className={className} > {q.name}</span >)
    });

    const renderProfessionRow = (profession) => {
        return (<span key={profession._id}> {profession.name}</span >)
    };

    return (
        <>
            {handlePhrase()}
            {users.length !== 0 ? (
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
                </table>) : (<></>)}
        </>
    );
};

export default Users;