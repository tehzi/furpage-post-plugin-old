import {
    ADD_IMAGE_LINK_TO_STORE,
    RESET_IMAGE,
    SET_ADDED,
    SET_IN_QUEUE,
} from "../actions/images";

const DEFAULT_STATE = {};
export const ADDED = "ADDED";
export const QUEUE = "QUEUE";

export default function images(state = DEFAULT_STATE, action) {
    if (action.type === ADD_IMAGE_LINK_TO_STORE) {
        const { payload: url } = action;
        if (!Object.keys(state).includes(url)) {
            return {
                ...state,
                [url]: null,
            };
        }
    }
    if (action.type === RESET_IMAGE) {
        const { payload: url } = action;
        return {
            ...state,
            [url]: null,
        };
    }
    if (action.type === SET_IN_QUEUE) {
        const { payload: url } = action;
        return {
            ...state,
            [url]: QUEUE,
        };
    }
    if (action.type === SET_ADDED) {
        const { payload: url } = action;
        return {
            ...state,
            [url]: ADDED,
        };
    }
    return state;
}
