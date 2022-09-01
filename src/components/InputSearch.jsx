import React from "react";
import PropTypes from "prop-types";

const InputSearch = ({ value, onChange, name, type }) => {
    return (
        <div className="input-group mb-3">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="form-control"
                placeholder={name}></input>
        </div >
    );
};

InputSearch.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    type: PropTypes.string
};

export default InputSearch;
