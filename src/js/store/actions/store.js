export const AUTH_SAVED = "AUTH_SAVED";
export const authSaved = () => ({ type: AUTH_SAVED });

export const AUTH_REMOVED = "AUTH_REMOVED";
export const authRemoved = () => ({ type: AUTH_REMOVED });

export const AUTH_READ = "AUTH_READ";
export const authRead = () => ({ type: AUTH_READ });

export const AUTH_ERROR = "AUTH_ERROR";
export const authError = payload => ({ type: AUTH_ERROR, payload });
