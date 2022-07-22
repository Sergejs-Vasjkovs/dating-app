import React from "react";
import Qualities from "./Qualities";
import Bookmark from "./Bookmark";
import PropTypes from "prop-types";

const User = ({ _id, name, qualities, profession, completedMeetings, rate, onDelete }) => {
    return (
        <tr className="align-middle">
            <td>{name}</td>
            <td>
                {qualities.map((qual) => (
                    <Qualities key={qual._id} {...qual} />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <td>
                <Bookmark />
            </td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDelete(_id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default User;
