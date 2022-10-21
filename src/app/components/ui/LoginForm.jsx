import React, { useEffect, useState } from "react";
import TextField from "../common/form/TextField";
import validator from "../../utils/validator";
import CheckBoxField from "../common/form/CheckBoxField";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });

    const history = useHistory();

    const { signIn } = useAuth();
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            await signIn(data);
            history.push(history.location.state ?
                history.location.state.form.pathname :
                "/");
        } catch (error) {
            setErrors(error);
        }
    };

    const buttonIsValid = Object.keys(errors).length === 0;

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

            <div className="d-grid gap-2">
                <button className="btn btn-primary" type="submit" disabled={!buttonIsValid}>Enter</button>
            </div>
        </form>
    );
};

export default LoginForm;
