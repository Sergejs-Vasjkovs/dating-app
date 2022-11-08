import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataStatus, loadUsersList } from "../../../store/users";
import PropTypes from "prop-types";

export const UsersLoader = ({ children }) => {
    const dataStatus = useSelector(getDataStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!dataStatus) dispatch(loadUsersList());
    }, []);

    if (!dataStatus) return <h2>Loading...</h2>;
    return children;
};

UsersLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
