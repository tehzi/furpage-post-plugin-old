/* global chrome */
import { eventChannel } from "redux-saga";
import {
    call,
    put,
    take,
} from "redux-saga/effects";
import {
    chromeError,
    tabChanged,
} from "../../actions/chrome";

const tabActivateChannel = () => eventChannel((emit) => {
    const onActivate = ({ tabId }) => {
        chrome.tabs.query({}, (tabs) => {
            const [tab = {}] = tabs.filter(({ id }) => tabId === id);
            emit(tab);
        });
    };
    if (chrome.tabs?.onActivated) {
        chrome.tabs.onActivated.addListener(onActivate);
    }
    return () => {
        chrome.tabs.onActivated.removeListener(onActivate);
    };
});

export default function* tabActivate() {
    const channel = yield call(tabActivateChannel);
    while (true) {
        try {
            const tab = yield take(channel);
            yield put(tabChanged(tab));
        } catch (err) {
            yield put(chromeError(err));
        }
    }
}
