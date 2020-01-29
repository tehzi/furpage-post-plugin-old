import { call, put, select } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import refreshApiPermission from "~api/permission/refreshApiPermission";
import { Auth, refreshApiAuth } from "~actions/login";
import AppStore from "~types/AppStore";
import getApiPermission from "~api/permission/getApiPermission";

const authSelector = ({ login: { auth } }: AppStore): Partial<Auth> => auth;

export default function* authorizeFlow<
    T extends (...args: unknown[]) => unknown
>(generatorFlow: T, ...parameters: Parameters<T>): SagaIterator {
    let result: ReturnType<T>;
    let apiTries = 0;
    let accessToken: string;

    try {
        ({ apiAccessToken: accessToken } = yield select(authSelector));
    } catch {}
    // noinspection LoopStatementThatDoesntLoopJS
    while (true) {
        try {
            result = yield call(
                generatorFlow as (...args: unknown[]) => unknown,
                accessToken,
                ...parameters,
            );
            break;
        } catch {
            switch (apiTries) {
                case 0:
                    try {
                        const { apiRefreshToken: refreshToken } = yield select(
                            authSelector,
                        );
                        // Try to get a new access token by refresh Token
                        const {
                            access_token: apiAccessToken,
                            refresh_token: apiRefreshToken,
                        } = yield call(refreshApiPermission, refreshToken);
                        accessToken = apiAccessToken;
                        yield put(
                            refreshApiAuth({
                                apiAccessToken,
                                apiRefreshToken,
                            }),
                        );
                    } catch {}
                    break;
                case 1:
                    try {
                        const { accessToken: vkAccessToken } = yield select(
                            authSelector,
                        );
                        const {
                            access_token: apiAccessToken,
                            refresh_token: apiRefreshToken,
                        } = yield call(getApiPermission, vkAccessToken);
                        yield put(
                            refreshApiAuth({
                                apiAccessToken,
                                apiRefreshToken,
                            }),
                        );
                    } catch {}
                    break;
                default:
            }
        }
        apiTries++;
        if (apiTries > 1) {
            break;
        }
    }

    return result;
}
