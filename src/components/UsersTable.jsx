import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

export default function UsersTable({ users, onDelete, selectedSort, onSort }) {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: { name: "Качества" },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: { path: "profession.name", name: "Встретился, раз" },
        rate: { path: "profession.name", name: "Оценка" },
        bookmark: { path: "profession.name", name: "Избранное" },
        delete: {}
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
