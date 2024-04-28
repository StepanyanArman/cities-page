import { GET_DATA, SELECT_CITY } from "./components/CitiesPage/actionType";


export const initialValue = {
    data: [],
    selectedCity: null
};

export function reducer(state, action) {
    switch (action.type) {
        case GET_DATA:
            return {
                ...state,
                data: action.payload
            };
        case SELECT_CITY:
            return {
                ...state,
                selectedCity: action.payload
            };
        default:
            return state;
    }
}
