import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/Bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import { Link } from "react-router-dom";

const UsersTable = ({ users, onDelete, selectedSort, onSort }) => {
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
        profession: { path: "profession.name", name: "Профессия" },
        completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark user={user.bookmark} />
            )
        },
        delete: {
            component: (user) =>
            (<button
                type="button"
                className="btn btn-danger"
                onClick={() => onDelete(user._id)}
            >
                Delete
            </button>)
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
    onDelete: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default UsersTable;
