export const AUTH = "AUTH";
export const auth = payload => ({ type: AUTH, payload });

export const DELETE_AUTH = "DELETE_AUTH";
export const deleteAuth = () => ({ type: DELETE_AUTH });

export const DELETED_AUTH = "DELETED_AUTH";
export const deletedAuth = () => ({ type: DELETED_AUTH });

export const VK_AUTH = "VK_AUTH";
export const vkAuth = () => ({ type: VK_AUTH });

export const FIND_STORED_AUTH = "FIND_STORED_AUTH";
export const findStoredAuth = () => ({ type: FIND_STORED_AUTH });

export const UNAUTHORIZED = "UNAUTHORIZED";
export const unauthorized = () => ({ type: UNAUTHORIZED });

export const ACCESS_ALLOW = "ACCESS_ALLOW";
export const accessAllow = () => ({ type: ACCESS_ALLOW });

export const ACCESS_DENY = "ACCESS_DENY";
export const accessDeny = () => ({ type: ACCESS_DENY });

export const SET_LOADING = "SET_LOADING";
export const setLoading = payload => ({ type: SET_LOADING, payload });
