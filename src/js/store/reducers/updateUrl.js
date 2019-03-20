import { UPDATE_URL } from "../actions/history";

const DEFAULT_STATE = {
    url: null,
};

export default function updateUrl(state = DEFAULT_STATE, action) {
    if (action.type === UPDATE_URL) {
        const { payload: url } = action;
        return {
            ...state,
            url,
        };
    }
    return state;
}
