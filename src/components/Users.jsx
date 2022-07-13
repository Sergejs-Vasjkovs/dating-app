import React from 'react';
import User from "./User";

const Users = (props) => {

    const { users } = props;

    return (
        <>
            {users.length !== 0 && (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col" className="col-2">Имя</th>
                            <th scope="col" className="col-3">Качества</th>
                            <th scope="col" className="col-2">Профессия</th>
                            <th scope="col" className="col-2">Встретился, раз</th>
                            <th scope="col" className="col-1">Оцента</th>
                            <th scope="col" className="col-1">Избранное</th>
                            <th scope="col" className="col-1"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <User {...props} />
                    </tbody>
                </table>)}
        </>
    );
};

export default Users;