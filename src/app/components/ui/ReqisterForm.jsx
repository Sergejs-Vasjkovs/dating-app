import React, { useEffect, useState } from "react";
import FieldText from "../common/form/TextField";
import validator from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/SelectField";
import RadioField from "../common/form/RadioField";
import MultiSelectField from "../common/form/MultiSelectField";
import CheckedBoxField from "../common/form/CheckedBoxField";

const ReqisterForm = () => {
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState({});
    const [errors, setError] = useState({});
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });

    useEffect(() => {
        api.professions.fetchAll().then(data => setProfessions(data));
        api.qualities.fetchAll().then(data => setQualities(data));
    }, []);

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
        },
        profession: {
            isRequired: {
                message: "Profession is required"
            }
        },
        licence: {
            isRequired: {
                message: "You need agreement a licence"
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

    const handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const buttonIsValid = Object.keys(errors).length === 0;

    return (
        <form onSubmit={handleSubmit}>
            <FieldText
                label="E-mail"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email} />

            <FieldText
                label="Password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password} />

            <SelectField
                label="Professions"
                name="professions"
                value={data.profession}
                onChange={handleChange}
                dafaultOption="Choose..."
                options={professions}
                error={errors.profession}
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Gender"
            />

            <MultiSelectField
                options={qualities}
                onChange={handleChange}
                defaultValue={data.qualities}
                name="qualities"
                label="Choose your qualities"
            />

            <CheckedBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                error={errors.licence}
            >Confirm <a className="text-primary" role="button">license agreement</a>
            </CheckedBoxField>

            <div className="d-grid gap-2">
                <button className="btn btn-primary" type="submit" disabled={!buttonIsValid}>Enter</button>
            </div>
        </form>
    );
};

export default ReqisterForm;
