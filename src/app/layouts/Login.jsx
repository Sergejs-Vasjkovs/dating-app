import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/LoginForm";
import ReqisterForm from "../components/ui/RegisterForm";

const Login = () => {
    const { type } = useParams;
    const [formType, setFormType] = useState(type === "register" ? type : "login");

    const toggleFormType = () => {
        setFormType(prevState => prevState === "register" ? "login" : "register");
    };

    return (
        <div className="container mt-5">
            <div className="row d-flex flex-column align-items-center">
                <div className="col-md-6 shadow p-4">
                    {formType === "register" ?
                        <>
                            <h3 className="mb-4">Register form</h3>
                            <ReqisterForm />
                            <p className="mt-3 mb-0 text-center">Already have accoun? <a className="text-primary" role="button" onClick={toggleFormType}>Sign In</a></p>
                        </> :
                        <>
                            <h3 className="mb-4">Login form</h3>
                            <LoginForm />
                            <p className="mt-3 mb-0 text-center">Dont have accoun? <a className="text-primary" role="button" onClick={toggleFormType}>Sign Up</a></p>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Login;
