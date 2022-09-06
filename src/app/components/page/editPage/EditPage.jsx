import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../api";
import MultiSelectField from "../../common/form/MultiSelectField";
import RadioField from "../../common/form/RadioField";
import SelectField from "../../common/form/SelectField";
import TextField from "../../common/form/TextField";

const EditPage = () => {
    const params = useParams();
    const { userId } = params;

    const [user, setUser] = useState({});
    const [qualities, setQualities] = useState([]);
    const [profession, setProfession] = useState();
    // const history = useHistory();

    // const handleBack = () => {
    //     history.replace("/users");
    // };

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
            setProfession(professionsList);
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

    const handleSubmit = () => {
        console.log("handle form", user);
        api.users.update(userId, user);
    };
    // console.log("user", user);
    // console.log("qualities", qualities);
    // console.log("user.qualities", user.qualities);
    if (user) {
        return (
            <div className="container mt-5">
                <div className="row d-flex flex-column align-items-center">
                    <div className="col-md-6 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <div>{console.log(user)}</div>
                            <TextField
                                label="Name"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                            />

                            <TextField
                                label="E-mail"
                                name="email"
                                value={user.email}
                                type="email"
                                onChange={handleChange}
                            />

                            <SelectField
                                label="Professions"
                                name="professions"
                                value={user.profession}
                                onChange={handleChange}
                                defaultOption="Choose..."
                                options={profession}
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
                                <Link to={`/users`}>
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                    >Change</button>
                                </Link>
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
