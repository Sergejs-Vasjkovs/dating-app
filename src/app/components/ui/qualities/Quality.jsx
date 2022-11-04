import React from "react";
import PropTypes from "prop-types";

const Qualities = ({ _id, name, color }) => {
    return <span key={_id} className={`badge bg-${color} m-1`}>{name}</span>;
};

Qualities.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    color: PropTypes.string
};

export default Qualities;
