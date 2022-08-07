import React from "react";
import PropTypes from "prop-types";

export default function TableHeader({ onSort, selectedSort, columns }) {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };

    const hahdleArrowDirection = () => {
        if (selectedSort.order) {
            return selectedSort.order === "asc" ? <i className=" bi bi-caret-down-fill" /> : <i className=" bi bi-caret-up-fill" />;
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map(column => (
                    <th key={column}
                        onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined}
                        {...{ role: columns[column].path && "button" }}
                        scope="col">
                        {columns[column].name} {columns[column].path ? hahdleArrowDirection() : undefined}
                    </th>))
                }
            </tr>
        </thead>
    );
}

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};
