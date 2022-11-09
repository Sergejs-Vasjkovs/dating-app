export const generateAuthError = (message) => {
    switch (message) {
        case "INVALID_PASSWORD":
            return "Invalid password";
        case "EMAIL_NOT_FOUND":
            return "E-mail not registered";
        case "EMAIL_EXISTS":
            return "User with this e-mail already exist";
        default:
            return "Too many attempts, please try later!";
    };
};
