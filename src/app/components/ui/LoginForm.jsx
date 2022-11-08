import React, { useEffect, useState } from "react";
import TextField from "../common/form/TextField";
import validator from "../../utils/validator";
import CheckBoxField from "../common/form/CheckBoxField";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/users";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });

    const history = useHistory();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [enterError, setEnterError] = useState(null);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        setEnterError(null);
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "E-mail is required"
            },
            isEmail: {
                message: "E-mail is not correct"
            }
        },
        password: {
            isRequired: {
                message: "Password is required"
            },
            isCapitalSymbol: {
                message: "Password must contain capital letter"
            },
            isContainDigit: {
                message: "Password must contain number"
            },
            minDigitCount: {
                message: "Password must contain min 8 characters",
                value: 8
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        const redirect = history.location.state ? history.location.state.from.pathname : "/";
        dispatch(login({ payload: data, redirect }));
    };

    const isValid = Object.keys(errors).length === 0;

    return (
        <form onSubmit={handleSubmit}>
            <TextField label="E-mail" name="email" value={data.email} onChange={handleChange} error={errors.email} />
            <TextField label="Password" type="password" name="password" value={data.password} onChange={handleChange} error={errors.password} />

            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >Stay login
            </CheckBoxField>
            {enterError && <p className="text-danger">{enterError}</p>}
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid || enterError}
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
