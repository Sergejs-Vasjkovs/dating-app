import React from "react";
import "numeralize-ru";

const SearchStatus = (props) => {
    const { users } = props;

    const pluralize = require("numeralize-ru").pluralize;
    const human = pluralize(users.length, "человек", "человека", "человек");
    const party = pluralize(users.length, "тусанет", "тусанут", "тусанет");

    return (
        <h2>
            <span
                className={
                    "badge " + (users.length > 0 ? "bg-primary" : "bg-danger")
                }
            >
                {users.length > 0
                    ? `${users.length} ${human} ${party} с тобой сегодня`
                    : `Никто с тобой не тусанет`}
            </span>
        </h2>
    );
};

export default SearchStatus;
