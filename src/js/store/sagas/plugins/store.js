/* global chrome */
import {
    call,
    put,
    take,
    takeEvery,
} from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {
    auth,
    AUTH,
    DELETE_AUTH,
    deletedAuth,
    FIND_STORED_AUTH,
    unauthorized,
} from "../../actions/login";
import {
    authError,
    authRead,
    authSaved,
} from "../../actions/store";

const setChannel = (accessToken, userId) => eventChannel((emit) => {
    chrome.storage.sync.set({ accessToken, userId }, () => {
        emit(true);
    });
    return () => {};
});

const getChannel = () => eventChannel((emit) => {
    chrome.storage.sync.get(["accessToken", "userId"], ({ accessToken, userId }) => {
        emit({ accessToken, userId });
    });
    return () => {};
});

const removeChannel = () => eventChannel((emit) => {
    chrome.storage.sync.remove(["accessToken", "userId"], () => {
        emit(true);
    });
    return () => {};
});

function* saveAuth({ payload: { accessToken, userId } }) {
    const saveChannel = yield call(setChannel, accessToken, userId);
    try {
        yield take(saveChannel);
        yield put(authSaved());
    } catch (err) {
        yield put(authError(err));
    }
}

function* putAuthToRedux() {
    const readChannel = yield call(getChannel);
    try {
        const { accessToken = false, userId = false } = yield take(readChannel);
        if (accessToken && userId) {
            yield put(auth({ accessToken, userId }));
            yield put(authRead());
        } else {
            yield put(unauthorized());
        }
    } catch (err) {
        yield put(authError(err));
    }
}

function* deleteAuthSaga() {
    const deleteChannel = yield call(removeChannel);
    try {
        yield take(deleteChannel);
        yield put(deletedAuth());
    } catch (err) {
        yield put(authError(err));
    }
}

export default function* store() {
    yield takeEvery(AUTH, saveAuth);
    yield takeEvery(FIND_STORED_AUTH, putAuthToRedux);
    yield takeEvery(DELETE_AUTH, deleteAuthSaga);
}
