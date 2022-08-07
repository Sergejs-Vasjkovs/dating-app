import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import UsersTable from "./UsersTable";
import paginate from "../api/utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./GroupList";
import SearchStatus from "./SearchStatus";
import api from "../api";
import _ from "lodash";

const Users = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

    const { users, onDelete } = props;
    const pageSize = 8;

    useEffect(() => {
        api.professions.fetchAll().then(data => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionsSelect = item => {
        setSelectedProf(item);
    };

    const handlePageChange = pageIndex => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const filteredUsers = selectedProf ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf)) : users;
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

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
                        onClick={clearFilter}><b>ОЧИСТИТЬ ФИЛЬТР</b>
                    </button>
                </div>
            }
            <div className="d-flex flex-column w-100">
                <SearchStatus users={filteredUsers} />
                {count !== 0 && (
                    <UsersTable users={userCrop}
                        onDelete={onDelete}
                        onSort={handleSort}
                        selectedSort={sortBy} />)}
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
