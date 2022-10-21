import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService, { setTokens } from "../services/localStorage.service";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const history = useHistory();
    const [currentUser, setCurrunetUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const signUp = async ({ email, password, ...rest }) => {
        try {
            const { data } = await httpAuth.post(`accounts:signUp`,
                { email, password, returnSecureToken: true });
            console.log(data);
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1)
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "User with this e-mail already exist"
                    };
                    throw errorObject;
                }
            }
        }
    };

    const signIn = async ({ email, password }) => {
        try {
            const { data } = await httpAuth.post(`accounts:signInWithPassword`,
                { email, password, returnSecureToken: true });
            setTokens(data);
            await getUserData();
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "INVALID_PASSWORD") {
                    const errorObject = { password: "Invalid password" };
                    throw errorObject;
                }
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = { email: "E-mail not registered" };
                    throw errorObject;
                }
            }
        }
    };

    const logOut = () => {
        localStorageService.removeAuthData();
        setCurrunetUser(null);
        history.push("/");
    };

    const getUserData = async () => {
        try {
            const { content } = await userService.getCurrentUser();
            setCurrunetUser(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (localStorageService.getAcessToken()) {
            getUserData();
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    const createUser = async (data) => {
        try {
            const { content } = await userService.create(data);
            setCurrunetUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    };

    const errorCatcher = (error) => {
        const { message } = error.response.data;
        setError(message);
    };

    return (
        <AuthContext.Provider value={{ signUp, currentUser, signIn, logOut }}>
            {!isLoading ? children : "Loading..."}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
