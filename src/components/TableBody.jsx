import React from "react";
import PropTypes from "prop-types";
// import _ from "lodash";

function TableBody({ columns, data }) {
    return (
        <tbody>
            {data.map(item =>
            (<tr key={item._id}>
                {Object.keys(columns).map(column =>
                    <td key={column}>{item[columns[column].path]}
                    </td>)}
            </tr>))}
        </tbody>
    );
}

TableBody.propTypes = {
    columns: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired
};

export default TableBody;
