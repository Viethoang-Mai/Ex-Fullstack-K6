export function rootReducer(state, action) {
    switch (action.type) {
        case "isLoading":
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
}

export const initialState = {
    isLoading: false,
};
