import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, value, onChange, dafaultOption, options, error, name }) => {
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };

    const optionsArray = !Array.isArray(options) && typeof (options) === "object" ?
        Object.keys(options).map(optionName => ({ name: options[optionName].name, _id: options[optionName]._id }))
        : options;

    const handelChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="col-md-12 mb-3">
            <label className="form-label" htmlFor={name}>{label}</label>
            <select
                className={getInputClasses()}
                id={name}
                name={name}
                value={value}
                onChange={handelChange}>
                <option disabled value="">{dafaultOption}</option>
                {optionsArray && optionsArray.map(option => (
                    <option
                        key={option._id}
                        value={option._id}>{option.name}</option>))}
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
    dafaultOption: PropTypes.string,
    error: PropTypes.string,
    name: PropTypes.string
};

export default SelectField;
