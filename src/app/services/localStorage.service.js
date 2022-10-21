const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USER_ID_KEY = "user-local-id";

export const setTokens = ({ refreshToken, idToken, localId, expiresIn = 3600 }) => {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(USER_ID_KEY, localId);
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
};

export const getAcessToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_KEY);
};

export const getTokenExpiresDate = () => {
    return localStorage.getItem(EXPIRES_KEY);
};

export const getUserId = () => {
    return localStorage.getItem(USER_ID_KEY);
};

export const removeAuthData = () => {
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
};

const localStorageService = {
    setTokens,
    getAcessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getUserId,
    removeAuthData
};

export default localStorageService;
