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
import { SagaIterator } from "redux-saga";
import {
    accessAllow,
    accessDeny,
    vkApiAuth,
    AUTH,
    auth,
    deleteAuth,
    VK_AUTH,
} from "~actions/login";
import { CHROME_TAB_COMPLETE } from "~actions/chrome";
import { findBlank } from "~helpers/mode";
import getGroupPermissionById from "~api/permission/getGroupPermissionById";
import getApiPermission from "~api/permission/getApiPermission";

const { CLIENT_ID } = process.env;
const { GROUP } = process.env;

export interface VKUrl {
    access_token: string;
    user_id: string;
}

function* startAuth(): SagaIterator {
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
    try {
        do {
            const { complete, vkAuth } = yield race({
                complete: take(CHROME_TAB_COMPLETE),
                vkAuth: take(VK_AUTH),
            });
            if (vkAuth) {
                break;
            }
            ({ payload: { tab: { url = false, id = false } = {} } = {} } =
                complete || {});
        } while (!(url && findBlank(url)));
        const blankUrl = new Uri(url);
        const {
            access_token: accessToken = false,
            user_id: userId = false,
        } = Uri.parseQuery(blankUrl.fragment()) as VKUrl;
        if (accessToken && userId) {
            try {
                const {
                    access_token: apiAccessToken,
                    refresh_token: apiRefreshToken,
                } = yield call(getApiPermission, accessToken);
                yield put(
                    auth({
                        accessToken,
                        userId,
                        apiAccessToken,
                        apiRefreshToken,
                    }),
                );
            } catch {
                yield put(accessDeny());
                yield put(deleteAuth());
            }
        }
        yield put(vkApiAuth());
        if (id !== false) {
            chrome.tabs.remove(id);
        }
    } catch {}
}

function* checkGroupPermission(): SagaIterator {
    try {
        const accessToken = yield select(
            ({ login: { auth: { accessToken: token = null } = {} } }) => token,
        );
        const { admin_level: adminLevel = 0 } = yield call(
            getGroupPermissionById,
            GROUP,
            accessToken,
        );
        if (adminLevel > 1) {
            yield put(accessAllow());
        } else {
            yield put(accessDeny());
            yield put(deleteAuth());
        }
    } catch (error) {
        yield put(deleteAuth());
    }
}

export default function* authorize(): SagaIterator {
    yield takeLatest(VK_AUTH, startAuth);
    yield takeEvery(AUTH, checkGroupPermission);
}
