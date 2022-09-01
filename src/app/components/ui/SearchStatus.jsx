import React from "react";
import "numeralize-ru";
import PropTypes from "prop-types";

const SearchStatus = (props) => {
    const { users } = props;
    const usersLength = users.length;

    const pluralize = require("numeralize-ru").pluralize;
    const human = pluralize(usersLength, "человек", "человека", "человек");
    const party = pluralize(usersLength, "тусанет", "тусанут", "тусанет");

    return (
        <h2>
            <span
                className={
                    "badge " + (usersLength > 0 ? "bg-primary" : "bg-danger")
                }
            >
                {usersLength > 0
                    ? `${usersLength} ${human} ${party} с тобой сегодня`
                    : `Никто с тобой не тусанет`}
            </span>
        </h2>
    );
};

SearchStatus.propTypes = {
    users: PropTypes.array.isRequired
};

export default SearchStatus;
