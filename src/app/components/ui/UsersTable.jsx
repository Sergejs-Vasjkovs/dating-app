import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/Bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import Profession from "../ui/Profession";
import { Link } from "react-router-dom";

const UsersTable = ({ users, selectedSort, onSort }) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>)
        },
        qualities: {
            name: "Качества",
            component: (user) => (
                <Qualities qualities={user.qualities} />)
        },
        profession: {
            name: "Профессия",
            component: (user) => (
                <Profession id={user.profession} />)
        },
        completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark user={user.bookmark} />
            )
        }
    };

    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default UsersTable;
