import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionsArray = !Array.isArray(options) && typeof (options) === "object" ?
        Object.keys(options).map(optionName => ({ label: options[optionName].name, value: options[optionName]._id }))
        : options;

    const handleChange = (value) => {
        onChange({ name, value });
    };

    return (
        <>
            <div>
                <label>{label}</label>
            </div>
            <Select
                closeMenuOnSelect={false}
                isMulti
                defaultValue={defaultValue}
                name={name}
                options={optionsArray}
                className="basic-multi-select mb-3"
                classNamePrefix="select"
                onChange={handleChange}
            />
        </>
    );
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array
};

export default MultiSelectField;
