import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";

const professionSlice = createSlice({
    name: "profession",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        professionRequested: (state) => {
            state.isLoading = true;
        },
        professionReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        professionRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { actions, reducer: professionReducer } = professionSlice;
const { professionRequested, professionReceived, professionRequestFailed } = actions;

export const loadProfessionsList = () => async (dispatch) => {
    dispatch(professionRequested());
    try {
        const { content } = await professionService.get();
        dispatch(professionReceived(content));
    } catch (error) {
        dispatch(professionRequestFailed(error.message));
    }
};

export const getProfessionByIds = (professionIds) => (state) => {
    return state.profession.entities.find(profession => profession._id === professionIds);
};

export const getProfessions = () => (state) => state.profession.entities;
export const getProfessionsLoadingStatus = () => (state) => state.profession.isLoading;

export default professionReducer;
