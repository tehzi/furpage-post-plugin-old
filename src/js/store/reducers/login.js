import {
    ACCESS_ALLOW,
    ACCESS_DENY,
    AUTH,
    DELETED_AUTH,
    SET_LOADING,
    // VK_AUTH,
} from "../actions/login";

const DEFAULT_STATE = {
    auth: false,
    hasPermission: false,
    checkFailed: null,
    loading: false,
};

export default function login(state = DEFAULT_STATE, action) {
    if (action.type === AUTH) {
        const { payload: auth } = action;
        return {
            ...state,
            auth,
        };
    }
    if (action.type === DELETED_AUTH) {
        return {
            ...state,
            auth: false,
        };
    }
    if ([ACCESS_ALLOW, ACCESS_DENY].includes(action.type)) {
        return {
            ...state,
            hasPermission: action.type === ACCESS_ALLOW,
            checkFailed: action.type === ACCESS_DENY,
        };
    }
    if (action.type === SET_LOADING) {
        const { payload: loading } = action;
        return {
            ...state,
            loading,
        };
    }
    return state;
}
