import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../../../api";
import MultiSelectField from "../../common/form/MultiSelectField";
import RadioField from "../../common/form/RadioField";
import SelectField from "../../common/form/SelectField";
import TextField from "../../common/form/TextField";
import validator from "../../../utils/validator";

const EditUserPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        // name: "",
        // email: "",
        // profession: "",
        // sex: "",
        // qualities: []
    });

    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
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
        const { profession, qualities } = data;
        api.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then(history.push(`/users`));
        // .then((data) => history.push(`/users/${data._id}`));
    };

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
                message: "Введите ваше имя"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    useEffect(() => {
        setIsLoading(true);
        api.users.getById(userId).then(({ qualities, profession, ...data }) => {
            setData(prevState => ({
                ...prevState,
                ...data,
                qualities: qualities.map(qual => ({ label: qual.name, value: qual._id })),
                profession: profession._id
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
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data]);

    useEffect(() => {
        validate();
    }, [data]);

    return (
        <div className="container mt-5">
            <div className="row d-flex flex-column align-items-center">
                <div className="col-md-6 shadow p-4">
                    {!isLoading && Object.keys(professions).length > 0
                        ? (<form onSubmit={handleSubmit}>
                            <TextField
                                label="Name"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />

                            <TextField
                                label="E-mail"
                                name="email"
                                type="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />

                            <SelectField
                                label="Professions"
                                name="profession"
                                defaultOption="Choose..."
                                value={data.profession}
                                options={professions}
                                onChange={handleChange}
                                error={errors.profession}
                            />

                            <RadioField
                                name="sex"
                                label="Gender"
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                onChange={handleChange}
                            />

                            <MultiSelectField
                                name="qualities"
                                label="Choose your qualities"
                                options={qualities}
                                onChange={handleChange}
                                defaultValue={data.qualities} />

                            <div className="d-grid gap-2">
                                <button
                                    className="btn btn-primary col-md-12"
                                    type="submit"
                                    disabled={!isValid}
                                >Change</button>
                            </div>
                        </form>) :
                        (<h2 className="text-center">Loading...</h2>)}
                </div>
            </div >
        </div >
    );
};

export default EditUserPage;
