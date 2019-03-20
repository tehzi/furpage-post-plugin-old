/* global chrome */
import { eventChannel } from "redux-saga";
import {
    call,
    put,
    take,
} from "redux-saga/effects";
import {
    chromeError,
    chromeTabComplete,
    chromeTabLoading,
} from "../../actions/chrome";

const tabChangeChannel = () => eventChannel((emit) => {
    const tabHandler = (tabId, changeInfo, tab) => {
        emit({
            tabId,
            changeInfo,
            tab,
        });
    };
    if (chrome.tabs?.onUpdated) {
        chrome.tabs.onUpdated.addListener(tabHandler);
    }
    return () => {
        chrome.tabs.onUpdated.removeEventListener(tabHandler);
    };
});

export default function* tabLoad() {
    const tabsChannel = yield call(tabChangeChannel);
    while (true) {
        try {
            const chromeEvent = yield take(tabsChannel);
            const { changeInfo: { status } } = chromeEvent;
            if (status === "loading") {
                yield put(chromeTabLoading(chromeEvent));
            }
            if (status === "complete") {
                yield put(chromeTabComplete(chromeEvent));
            }
        } catch (err) {
            yield put(chromeError(err));
        }
    }
}
