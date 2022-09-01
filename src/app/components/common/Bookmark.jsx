import React, { useState } from "react";

const Bookmark = (bookmark) => {
    // console.log(bookmark); // TO DO проверить почему не отображается false;
    const [isActive, setIsActive] = useState(bookmark);

    const handleClick = () => {
        setIsActive((current) => !current);
    };

    return (
        <button className="btn btn-outline-danger" onClick={handleClick}>
            <i className={isActive ? " bi-bookmark" : "bi-bookmark-fill"}></i>
        </button>
    );
};

export default Bookmark;
