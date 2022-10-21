import React, { useState } from "react";
import PropTypes from "prop-types";
import validator from "../../utils/validator";
import TextAreaField from "./form/TextAreaField";

const NewCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
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
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        setData({});
        setErrors({});
    };

    return (
        <div>
            <h2>New comment</h2>
            <div className="mb-4">
                <form onSubmit={handleSubmit}>
                    <TextAreaField
                        name="content"
                        label="Comment"
                        value={data.content || ""}
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
