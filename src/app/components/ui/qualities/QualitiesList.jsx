import React from "react";
import PropTypes from "prop-types";
import Quality from "./Quality";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { isLoading, qualities: allQualities } = useQualities();
    const result = [];
    qualities.filter(id => {
        return allQualities.forEach(element => {
            if (element._id === id) {
                result.push(element);
            }
        });
    });

    if (!isLoading) {
        return <>
            {result.map((qual) => (
                <Quality key={qual._id} {...qual} />
            ))}
        </>;
    } else return "Loading...";
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
