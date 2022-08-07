import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Bookmark from "./Bookmark";
import QualitiesList from "./QualitiesList";
export default function UsersTable({ users, onDelete, selectedSort, onSort }) {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качества",
            component: (user) => (
                <QualitiesList qualities={user.qualities} />)
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
        <table className="table table-striped">
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, data: users, onDelete }} />
        </table>
    );
}

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};
