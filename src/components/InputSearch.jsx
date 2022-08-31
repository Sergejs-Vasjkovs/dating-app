import React from "react";
import PropTypes from "prop-types";

const InputSearch = ({ value, onChange }) => {
    return (
        <div className="input-group mb-3">
            <input
                type="text"
                name="search"
                value={value}
                onChange={onChange}
                className="form-control"
                placeholder="Search"></input>
        </div >
    );
};

InputSearch.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default InputSearch;
