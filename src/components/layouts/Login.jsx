import React, { useEffect, useState } from "react";
import FieldText from "../FieldText";
import validator from "../../api/utils/validator";

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [errors, setError] = useState({});

    const handleChange = ({ target }) => {
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
        setError(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        console.log(data);
    };

    const buttonIsValid = Object.keys(errors).length === 0;

    return (
        <div className="d-flex flex-column align-items-center">
            <h3 className="mb-4">Login page</h3>
            <form className="col-sm-6 shadow p-4" onSubmit={handleSubmit}>
                <FieldText label="E-mail" name="email" value={data.email} onChange={handleChange} error={errors.email} />
                <FieldText label="Password" type="password" name="password" value={data.password} onChange={handleChange} error={errors.password} />
                <div className="d-grid gap-2">
                    <button className="btn btn-primary" type="submit" disabled={!buttonIsValid}>Enter</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
