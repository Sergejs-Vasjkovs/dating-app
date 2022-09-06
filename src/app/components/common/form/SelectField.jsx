import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, value, onChange, defaultOption, options, error, name }) => {
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;

    console.log(value);
    console.log(optionsArray);

    return (
        <div className="col-md-12 mb-3">
            <label className="form-label" htmlFor={name}>{label}</label>
            <select
                className={getInputClasses()}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}>
                <option disabled value="">{defaultOption}</option>
                {optionsArray && optionsArray.map(option => (
                    <option option
                        selected={value === option.label}
                        key={option.value}
                        value={option.label} >{option.label}</option>))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div >
    );
};

SelectField.propTypes = {
    options: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    value: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
    defaultOption: PropTypes.string,
    error: PropTypes.string,
    name: PropTypes.string
};

export default SelectField;
