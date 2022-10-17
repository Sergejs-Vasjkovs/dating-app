import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Qualities = ({ id }) => {
    const { getQualityById } = useQualities();
    const { _id, name, color } = getQualityById(id);
    return <span key={_id} className={`badge bg-${color} m-1`}>{name}</span>;
};

Qualities.propTypes = {
    id: PropTypes.string.isRequired
};

export default Qualities;
