import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../../../api";
import MultiSelectField from "../../common/form/MultiSelectField";
import RadioField from "../../common/form/RadioField";
import SelectField from "../../common/form/SelectField";
import TextField from "../../common/form/TextField";
import validator from "../../../utils/validator";

const EditPage = () => {
    const params = useParams();
    const { userId } = params;
    const history = useHistory();

    const [user, setUser] = useState({});
    const [qualities, setQualities] = useState([]);
    const [professions, setProfessions] = useState();
    const [errors, setErrors] = useState({});

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Имя обязателен для заполнения"
            },
            min: {
                message: "Имя должен состоять минимум из 3 символов",
                value: 3
            }
        }
    };

    useEffect(() => {
        validate();
    }, [user]);

    const validate = () => {
        const errors = validator(user, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleChange = (target) => {
        setUser(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    useEffect(() => {
        api.users.getById(userId).then(data => {
            setUser(prevState => ({
                ...prevState,
                ...data,
                qualities: data.qualities.map(qual => ({ label: qual.name, value: qual._id })),
                profession: data.profession.name
            }));
        });

        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });

        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const getProfessionID = (profession) => {
        for (const prof of professions) {
            if (prof.label === profession) {
                return prof.value;
            }
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = user;
        api.users.update(userId, {
            ...user,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        }).then(history.replace("/users"));
    };

    if (user && qualities && professions) {
        return (
            <div className="container mt-5">
                <div className="row d-flex flex-column align-items-center">
                    <div className="col-md-6 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Name"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                error={errors.name}
                            />

                            <TextField
                                label="E-mail"
                                name="email"
                                value={user.email}
                                type="email"
                                onChange={handleChange}
                                error={errors.email}
                            />

                            <SelectField
                                label="Professions"
                                name="profession"
                                value={getProfessionID(user.profession)}
                                onChange={handleChange}
                                defaultOption="Choose..."
                                options={professions}
                                error={errors.profession}
                            />

                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={user.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Gender"
                            />

                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                defaultValue={user.qualities}
                                name="qualities"
                                label="Choose your qualities" />

                            <div className="d-grid gap-2">
                                <button
                                    className="btn btn-primary col-md-12"
                                    type="submit"
                                    disabled={!isValid}
                                >Change</button>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        );
    } else {
        return <h2 className="text-center">Loading...</h2>;
    }
};

export default EditPage;
