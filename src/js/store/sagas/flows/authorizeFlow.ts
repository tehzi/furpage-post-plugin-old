import { call, put, select } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import refreshApiPermission from "~api/permission/refreshApiPermission";
import { refreshApiAuth } from "~actions/login";

export default function* authorizeFlow<
    T extends (...args: unknown[]) => unknown
>(generatorFlow: T, ...parameters: Parameters<T>): SagaIterator {
    let result: ReturnType<T>;
    let apiTries = 0;

    try {
        // noinspection LoopStatementThatDoesntLoopJS

        while (true) {
            try {
                const { apiAccessToken: accessToken } = yield select(
                    ({ login: { auth } }) => auth,
                );
                result = yield call(
                    generatorFlow as (...args: unknown[]) => unknown,
                    accessToken,
                    ...parameters,
                );
            } catch {
                switch (apiTries) {
                    case 0:
                        try {
                            const {
                                apiRefreshToken: refreshToken,
                            } = yield select(({ login: { auth } }) => auth);
                            // Try to get a new access token by refresh Token
                            const {
                                access_token: apiAccessToken,
                                refresh_token: apiRefreshToken,
                            } = yield call(refreshApiPermission, refreshToken);
                            yield put(
                                refreshApiAuth({
                                    apiAccessToken,
                                    apiRefreshToken,
                                }),
                            );
                        } catch {}

                        apiTries++;
                        break;
                    case 1:
                        break;
                    default:
                        apiTries++;
                }
            }
            break;
        }
    } catch {}

    return result;
}
