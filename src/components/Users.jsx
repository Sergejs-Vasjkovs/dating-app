import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import User from "./User";
import paginate from "../api/utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./GroupList";
import SearchStatus from "./SearchStatus";
import api from "../api";

const Users = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();

    const { users, onDelete } = props;
    const pageSize = 4;

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionsSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const filteredUsers = selectedProf ? users.filter((user) => user.profession === selectedProf) : users;
    const count = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className="d-flex">
            {professions &&
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionsSelect} />

                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}><b>ОЧИСТИТЬ ФИЛЬТР</b></button>
                </div>
            }
            <div className="d-flex flex-column w-100">
                <SearchStatus users={filteredUsers} />
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
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default Users;
