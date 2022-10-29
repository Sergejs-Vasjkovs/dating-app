import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import MultiSelectField from "../../common/form/MultiSelectField";
import RadioField from "../../common/form/RadioField";
import SelectField from "../../common/form/SelectField";
import TextField from "../../common/form/TextField";
import validator from "../../../utils/validator";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = () => {
    const { userId } = useParams();
    const { updateUser, currentUser } = useAuth();
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        name: "",
        qualities: [],
        licence: false
    });

    const { getUserById, isLoading: isLoadingUser } = useUser();

    const { professions: professionsList, isLoading: isLoadingProf } = useProfessions();
    const professions = professionsList.map(qual => ({ value: qual._id, label: qual.name }));

    const { qualities: qualitiesList, isLoading: isLoadingQual, getQualityById } = useQualities();
    const qualities = qualitiesList.map(qual => ({ value: qual._id, label: qual.name, color: qual.color }));

    const convertQualities = (data) => {
        const qualitiesArray = [];
        for (const id of data.qualities) {
            const quality = getQualityById(id);
            qualitiesArray.push({
                value: quality._id,
                label: quality.name,
                color: quality.color
            });
        }
        setLoading(false);
        return qualitiesArray;
    };

    useEffect(() => {
        if (currentUser._id !== userId) {
            history.push(`/users/${currentUser._id}`);
        } else {
            const user = getUserById(userId);
            setData((prevState) => ({
                ...prevState,
                ...user,
                qualities: convertQualities(user)
            }));
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map(q => q.value)
        };
        try {
            await updateUser(newData);
            handleBack();
        } catch (error) {
            setErrors(error);
        }
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

    const handleBack = () => {
        history.goBack();
    };

    useEffect(() => {
        validate();
    }, [data]);

    return (
        <div className="container mt-5">
            <div className="row d-flex flex-column align-items-center">
                <div className="col-md-6 shadow p-4">
                    {!isLoadingUser && !isLoadingProf && !isLoadingQual && !isLoading
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
                                >Save</button>
                                <button
                                    className="btn btn-dark col-md-12"
                                    type="button"
                                    onClick={handleBack}
                                >Back</button>
                            </div>
                        </form>) :
                        (<h2 className="text-center">Loading...</h2>)}
                </div>
            </div >
        </div >
    );
};

export default EditUserPage;
