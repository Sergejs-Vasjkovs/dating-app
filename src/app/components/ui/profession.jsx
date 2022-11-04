import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfessionByIds, getProfessionsLoadingStatus } from "../../store/profession";

const Profession = ({ id }) => {
    const isLoading = useSelector(getProfessionsLoadingStatus());
    const profession = useSelector(getProfessionByIds(id));
    if (!isLoading) {
        return <p>{profession.name}</p>;
    } else return "Loading...";
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
