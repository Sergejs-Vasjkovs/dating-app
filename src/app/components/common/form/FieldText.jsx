import React, { useState } from "react";
import PropTypes from "prop-types";

const FieldText = ({ label, type, name, value, onChange, error }) => {
    const [showPassword, setShowPassword] = useState(false);

    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    const toggleShowPassword = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <div className="mb-3 ">
            <label htmlFor="email">{label}</label>
            <div className="input-group">
                <input
                    className={getInputClasses()} placeholder={label.toLowerCase()}
                    type={showPassword ? "text" : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange} />
                {type === "password" && <button className="btn btn-outline-secondary"
                    type="button"
                    onClick={toggleShowPassword}><i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i></button>}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div >
    );
};

FieldText.defaultProps = {
    type: "text"
};

FieldText.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default FieldText;
