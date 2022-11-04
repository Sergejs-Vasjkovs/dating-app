import { combineReducers, configureStore } from "@reduxjs/toolkit";
import professionReducer from "./profession";
import qualitiesReducer from "./qualities";

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    profession: professionReducer
});

export const createStore = () => {
    return configureStore({
        reducer: rootReducer
    });
};
