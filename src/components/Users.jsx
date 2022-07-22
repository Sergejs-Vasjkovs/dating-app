import React, { useState } from "react";
import Pagination from "./Pagination";
import User from "./User";
import paginate from "../api/utils/paginate";
import PropTypes from "prop-types";

const Users = (props) => {
    const { users, onDelete } = props;
    const count = users.length;
    const pageSize = 4;

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const userCrop = paginate(users, currentPage, pageSize);

    return (
        <>
            {count !== 0 && (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col" className="col-2">
                                Имя
                            </th>
                            <th scope="col" className="col-3">
                                Качества
                            </th>
                            <th scope="col" className="col-2">
                                Профессия
                            </th>
                            <th scope="col" className="col-2">
                                Встретился, раз
                            </th>
                            <th scope="col" className="col-1">
                                Оцента
                            </th>
                            <th scope="col" className="col-1">
                                Избранное
                            </th>
                            <th scope="col" className="col-1"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {userCrop.map((user) => (
                            <User
                                key={user._id}
                                onDelete={onDelete}
                                {...user}
                            />
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default Users;
