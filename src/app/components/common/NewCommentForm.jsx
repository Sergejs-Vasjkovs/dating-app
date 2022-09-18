import React, { useState, useEffect } from "react";
import api from "../../api/index";
import PropTypes from "prop-types";
import SelectField from "./form/SelectField";
import validator from "../../utils/validator";
import TextAreaField from "./form/TextAreaField";

const NewCommentForm = ({ onSubmit }) => {
    const [users, setUsers] = useState({});
    const [data, setData] = useState({
        userId: "",
        content: ""
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.users.fetchAll().then(data => setUsers(data));
    }, []);

    const handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Choose user name"
            }
        },
        content: {
            isRequired: {
                message: "Enter anything"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = e => {
        console.log(data);
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        setData({
            userId: "",
            content: ""
        });
        setErrors({});
    };

    const arrayOfUsers = users && Object.keys(users).map(userId => ({
        label: users[userId].name,
        value: users[userId]._id
    }));

    return (
        <div>
            <h2>New comment</h2>
            <div className="mb-4">
                <form onSubmit={handleSubmit}>
                    <SelectField
                        label="Choose user name"
                        name="userId"
                        defaultOption="Choose..."
                        value={data.userId}
                        options={arrayOfUsers}
                        onChange={handleChange}
                        error={errors.profession}
                    />
                    <TextAreaField
                        name="content"
                        label="Comment"
                        value={data.content}
                        onChange={handleChange}
                        error={errors.content}
                    />
                    <button
                        className="btn btn-primary col-md-12 mt-3"
                        type="submit"
                    >Post comment</button>

                </form>
            </div>
        </div >
    );
};

NewCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default NewCommentForm;
