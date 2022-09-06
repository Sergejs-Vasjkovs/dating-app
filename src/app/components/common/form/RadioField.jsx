import React from "react";
import PropTypes from "prop-types";

const RadioFields = ({ options, name, onChange, value, label }) => {
    const handelChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-3">
            <div>
                <label>{label}</label>
            </div>
            {options.map(option => (
                <div key={option.name + "" + option.value} className="form-check form-check-inline">
                    <input className="form-check-input"
                        type="radio"
                        name={name}
                        id={option.name + "_" + option.value}
                        value={option.value}
                        checked={option.value === value}
                        onChange={handelChange} />
                    <label className="form-check-label" htmlFor={option.name + "_" + option.value}>
                        {option.name}
                    </label>
                </div>
            ))}
        </div>
    );
};

RadioFields.propTypes = {
    options: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string
};

export default RadioFields;
