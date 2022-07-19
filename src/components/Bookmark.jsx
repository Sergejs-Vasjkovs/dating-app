import React, { useState } from "react";

const Bookmark = () => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive((current) => !current);
    };

    return (
        <button className="btn btn-outline-danger" onClick={handleClick}>
            <i className={isActive ? " bi-bookmark-fill" : "bi-bookmark"}></i>
        </button>
    );
};

export default Bookmark;
