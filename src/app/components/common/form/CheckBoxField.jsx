import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange, children, error }) => {
    const handelChange = () => {
        onChange({ name, value: !value });
    };

    const getInputClasses = () => {
        return "form-check-label" + (error ? " is-invalid" : "");
    };

    return (
        <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" value="" id={name} onChange={handelChange} checked={value} />
            <label className={getInputClasses()} htmlFor={name}>
                {children}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

CheckBoxField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    error: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default CheckBoxField;
