/* global chrome */
import {
    call,
    put,
    race,
    select,
    take,
    takeEvery,
    takeLatest,
} from "redux-saga/effects";
import Uri from "urijs";
import {
    accessAllow,
    accessDeny,
    AUTH,
    auth,
    deleteAuth,
    VK_AUTH,
} from "../../actions/login";
import { CHROME_TAB_COMPLETE } from "../../actions/chrome";
import { findBlank } from "../../../helpers/mode";
import { CLIENT_ID, GROUP } from "../../../../json/config.json";
import getById from "../../../api/groups/getById";

function* startAuth() {
    const uri = new Uri("https://oauth.vk.com/authorize");
    uri.addQuery({
        client_id: CLIENT_ID,
        scope: "pages,wall,groups,offline,notify,friends",
        redirect_uri: "https://oauth.vk.com/blank.html",
        response_type: "token",
    });
    chrome.tabs.create({
        url: String(uri),
        selected: true,
    });
    let url;
    let id;
    do {
        const { complete, vkAuth } = yield race({
            complete: take(CHROME_TAB_COMPLETE),
            vkAuth: take(VK_AUTH),
        });
        if (vkAuth) {
            break;
        }
        ({
            payload: {
                tab: {
                    url = false,
                    id = false,
                } = {},
            } = {},
        } = complete || {});
    } while (!(url && findBlank(url)));
    const blankUrl = new Uri(url);
    const {
        access_token: accessToken = false,
        user_id: userId = false,
    } = Uri.parseQuery(blankUrl.fragment());
    if (accessToken && userId) {
        yield put(auth({ accessToken, userId }));
    }
    if (id !== false) {
        chrome.tabs.remove(id);
    }
}

function* checkGroupPermission() {
    const accessToken = yield select(({ login: { auth: { accessToken: token } = {} } }) => token);
    const { admin_level: adminLevel = 0 } = yield call(getById, GROUP, accessToken);
    if (adminLevel > 1) {
        yield put(accessAllow());
    } else {
        yield put(accessDeny());
        yield put(deleteAuth());
    }
}

export default function* authorize() {
    yield takeLatest(VK_AUTH, startAuth);
    yield takeEvery(AUTH, checkGroupPermission);
}
