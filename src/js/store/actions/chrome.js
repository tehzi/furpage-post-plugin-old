export const TAB_CHANGED = "TAB_CHANGED";
export const tabChanged = payload => ({ type: TAB_CHANGED, payload });

export const CHROME_ERROR = "CHROME_ERROR";
export const chromeError = payload => ({ type: CHROME_ERROR, payload });

export const CHROME_TAB_LOADING = "CHROME_TAB_LOADING";
export const chromeTabLoading = payload => ({ type: CHROME_TAB_LOADING, payload });

export const CHROME_TAB_COMPLETE = "CHROME_TAB_COMPLETE";
export const chromeTabComplete = payload => ({ type: CHROME_TAB_COMPLETE, payload });
