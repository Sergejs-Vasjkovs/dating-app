import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import UsersTable from "./table/UsersTable";
import paginate from "../api/utils/paginate";
import GroupList from "./GroupList";
import SearchStatus from "./SearchStatus";
import api from "../api";
import _ from "lodash";
import InputSearch from "./InputSearch";

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [searchInput, setSeachInput] = useState("");
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

    const pageSize = 6;

    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then(data => setUsers(data));
    }, []);

    useEffect(() => {
        api.users.fetchAll().then(data => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        const newUsers = users.filter((user) => user._id !== userId);
        setUsers(newUsers);
    };

    // вставляет данные в инпут после ввода
    const handleInputChange = ({ target }) => {
        setSeachInput(target.value); // как правильно использовать preveState для string?
        console.log(target.value);
    };

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

    const searchUserInList = (searchInput) => {
        const searchedUsers = users.filter((user) => user.name.toLowerCase().includes(searchInput.toLowerCase()));
        setUsers(searchedUsers);
    };

    useEffect(() => {
        searchUserInList(searchInput);
    }, [searchInput]);

    if (users) {
        const filteredUsers = selectedProf ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf)) : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const userCrop = paginate(sortedUsers, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedProf();
            setSeachInput("");
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
                        value={searchInput}
                        onChange={handleInputChange}
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

export default UsersList;
