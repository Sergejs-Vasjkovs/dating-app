import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ name, label, value, onChange, error }) => {
    const handelChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    return (
        <div className="mb-4">
            <label
                htmlFor={name}
                className="form-label">{label}</label>
            <textarea
                id={name}
                name={name}
                value={value}
                className={getInputClasses()}
                onChange={handelChange}
                rows="3"
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

TextAreaField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextAreaField;
