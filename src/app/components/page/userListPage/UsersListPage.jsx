import React, { useState, useEffect } from "react";
import Pagination from "../../common/Pagination";
import UsersTable from "../../ui/UsersTable";
import paginate from "../../../utils/paginate";
import GroupList from "../../common/GroupList";
import SearchStatus from "../../ui/SearchStatus";
import api from "../../../api";
import _ from "lodash";
import InputSearch from "../../common/InputSearch";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [searchQuery, setSeachQuery] = useState("");
    const [users, setUsers] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

    const pageSize = 6;

    useEffect(() => {
        api.users.fetchAll().then(data => setUsers(data));
    }, []);

    useEffect(() => {
        api.users.fetchAll().then(data => setUsers(data));
    }, []);

    useEffect(() => {
        api.professions.fetchAll().then(data => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    const handleDelete = (userId) => {
        const newUsers = users.filter((user) => user._id !== userId);
        setUsers(newUsers);
    };

    const handleSearchQuery = ({ target }) => {
        if (searchQuery !== "") setSelectedProf(undefined);
        setSeachQuery(target.value);
    };

    const handleProfessionsSelect = item => {
        setSeachQuery("");
        setSelectedProf(item);
    };

    const handlePageChange = pageIndex => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const filteredUsers = searchQuery
            ? users.filter(user => user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
            : selectedProf
                ? users.filter(
                    (user) => JSON.stringify(user.profession) ===
                        JSON.stringify(selectedProf))
                : users;

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

                    <InputSearch
                        type="text"
                        name="search"
                        value={searchQuery}
                        onChange={handleSearchQuery}
                    />

                    {count !== 0 && (
                        <UsersTable users={userCrop}
                            onDelete={handleDelete}
                            onSort={handleSort}
                            selectedSort={sortBy} />)}
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div >
        );
    }
    return (<h2 className="text-center">Loading...</h2>);
};

export default UsersListPage;
