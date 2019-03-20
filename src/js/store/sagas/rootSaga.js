import {
    all,
    fork,
    put,
} from "redux-saga/effects";
import { isUndefined } from "lodash";
import tabLoad from "./tabs/tabLoad";
import tabFlow from "./tabs/tabFlow";
import urlSaga from "./history/urlSaga";
import authorize from "./plugins/authorize";
import store from "./plugins/store";
import { findStoredAuth } from "../actions/login";
import { findMode } from "../../helpers/mode";
import findImage from "./image/findImage";
import tabActivate from "./tabs/tabActivate";
import sendImage from "./image/sendImage";

export default function* rootSaga() {
    const mode = findMode();
    const isCore = isUndefined(mode);
    yield all([
        fork(tabLoad),
        fork(tabActivate),
        fork(tabFlow),
        fork(urlSaga),
        isCore && fork(authorize),
        isCore && fork(findImage),
        isCore && fork(sendImage),
        fork(store),
    ].filter(item => item));
    if (isCore) {
        yield put(findStoredAuth());
    }
}
