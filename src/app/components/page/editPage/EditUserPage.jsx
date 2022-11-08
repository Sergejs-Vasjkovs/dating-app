import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MultiSelectField from "../../common/form/MultiSelectField";
import RadioField from "../../common/form/RadioField";
import SelectField from "../../common/form/SelectField";
import TextField from "../../common/form/TextField";
import validator from "../../../utils/validator";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import { getQualities, getQualitiesLoadingStatus } from "../../../store/qualities";
import { getProfessions, getProfessionsLoadingStatus } from "../../../store/professions";

const EditUserPage = () => {
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const { updateUser, currentUser } = useAuth();

    const professionsList = useSelector(getProfessions());
    const isLoadingProf = useSelector(getProfessionsLoadingStatus());
    const professions = professionsList.map(qual => ({ value: qual._id, label: qual.name }));

    const qualitiesList = useSelector(getQualities());
    const isLoadingQual = useSelector(getQualitiesLoadingStatus());
    const qualities = qualitiesList.map(qual => ({ value: qual._id, label: qual.name }));

    useEffect(() => {
        if (!isLoadingProf && !isLoadingQual && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
        }
    }, [isLoadingProf, isLoadingQual, currentUser, data]);

    useEffect(() => {
        if (data && isLoading) {
            setLoading(false);
        }
    }, [data]);

    useEffect(() => {
        validate();
    }, [data]);

    const getQualitiesListByIds = (qualitiesIds) => {
        const qualitiesArray = [];
        for (const qualId of qualitiesIds) {
            for (const quality of qualitiesList) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    };

    const transformData = (data) => {
        return getQualitiesListByIds(data).map((qual) => ({ value: qual._id, label: qual.name }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        await updateUser({
            ...data,
            qualities: data.qualities.map(q => q.value)
        });
        history.push(`/users/${currentUser._id}`);
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

    return (
        <div className="container mt-5">
            <div className="row d-flex flex-column align-items-center">
                <div className="col-md-6 shadow p-4">
                    {!isLoading
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
