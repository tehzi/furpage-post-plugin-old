import { eventChannel } from "redux-saga";
import {
    call,
    put,
    take,
} from "redux-saga/effects";
import {
    errorUrl,
    updateUrl,
} from "../../actions/history";

const urlReloadChannel = () => eventChannel((emit) => {
    let url = window.location.href;
    const urlInterval = setInterval(() => {
        const { href } = window.location;
        if (url !== href) {
            url = href;
            emit(href);
        }
    }, 100);
    return () => {
        clearInterval(urlInterval);
    };
});

export default function* urlSaga() {
    const channel = yield call(urlReloadChannel);
    while (true) {
        try {
            const url = yield take(channel);
            yield put(updateUrl(url));
        } catch (err) {
            yield put(errorUrl(err));
        }
    }
}
