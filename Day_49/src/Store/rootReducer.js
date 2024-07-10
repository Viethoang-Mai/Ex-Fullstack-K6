import { getNumber } from "../Utils/getNumber";

export function rootReducer(state, action) {
    switch (action.type) {
        case "set_width":
            return {
                ...state,
                rate: action.payload.rate,
                range: action.payload.range,
                restTimes: action.payload.restTimes,
                number: getNumber(action.payload.range),
            };
        case "rest_time":
            return { ...state, restTimes: action.payload };

        default:
            return state;
    }
}

export const initialState = {
    rate: 0,
    restTimes: 0,
    range: 0,
    number: getNumber,
};

export const resultReducer = (state, action) => {
    switch (action.type) {
        case "set_result/success":
            return {
                ...state,
                result: "Chúc mừng bạn đã đoán đúng",
            };
        case "set_result/lower":
            return {
                ...state,
                result: "Bạn cần tăng lên một chút",
            };
        case "set_result/higher":
            return {
                ...state,
                result: "Bạn cần giảm đi một chút",
            };

        default:
            return state;
    }
};
export const resultState = {
    result: "Chào mừng bạn đến với trò chơi đoán số!",
    data: [],
};
