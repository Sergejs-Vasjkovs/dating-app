import React from "react";

const Qualities = ({ qual }) => {
    return <span className={`badge bg-${qual.color} m-1`}>{qual.name}</span>;
};

export default Qualities;
