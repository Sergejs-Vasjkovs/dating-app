import React, { useState, useEffect } from "react";
import Pagination from "../../common/Pagination";
import UsersTable from "../../ui/UsersTable";
import paginate from "../../../utils/paginate";
import GroupList from "../../common/GroupList";
import SearchStatus from "../../ui/SearchStatus";
import _ from "lodash";
import InputSearch from "../../ui/InputSearch";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import { getProfessions, getProfessionsLoadingStatus } from "../../../store/professions";

const UsersListPage = () => {
    const { users } = useUser();
    const { currentUser } = useAuth();
    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [searchQuery, setSeachQuery] = useState("");
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const pageSize = 6;

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    const handleDelete = (userId) => {
        console.log(userId);
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

    const filterUsers = (data) => {
        const filteredUsers = searchQuery
            ? data.filter(user => user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
            : selectedProf
                ? data.filter(
                    (user) => JSON.stringify(user.profession) ===
                        JSON.stringify(selectedProf))
                : data;

        return filteredUsers.filter(user => user._id !== currentUser._id);
    };

    if (users) {
        const filteredUsers = filterUsers(users);

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const userCrop = paginate(sortedUsers, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                {professions && !professionsLoading &&
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
