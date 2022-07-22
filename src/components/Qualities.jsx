import React from "react";
import PropTypes from "prop-types";

const Qualities = (props) => {
    return <span className={`badge bg-${props.color} m-1`}>{props.name}</span>;
};

Qualities.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default Qualities;
