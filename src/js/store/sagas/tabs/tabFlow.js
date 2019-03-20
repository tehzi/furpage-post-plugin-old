/* global chrome */
import { take } from "redux-saga/effects";
import { CHROME_TAB_COMPLETE } from "../../actions/chrome";
import { findMode } from "../../../helpers/mode";

export default function* tabFlow() {
    while (true) {
        const {
            payload: {
                tabId,
                tab: { url },
            },
        } = yield take(CHROME_TAB_COMPLETE);
        const isValidSite = !!findMode(url);
        chrome.pageAction[isValidSite ? "show" : "hide"](tabId);
    }
}
