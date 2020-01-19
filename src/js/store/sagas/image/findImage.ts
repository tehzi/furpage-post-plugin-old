import { call, put, select, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { setLoading } from "~actions/login";
import {
    CHROME_TAB_COMPLETE,
    chromeError,
    TAB_CHANGED,
    ChromeTabArgs,
} from "~actions/chrome";
import { findImageUrl } from "~helpers/mode";
import {
    ADD_IMAGE_LINK_TO_STORE,
    addImageLinkToStore,
    resetImage,
    setAdded,
    setInQueue,
    UPDATE_IMAGE,
    updateImage,
} from "~actions/images";
import getStatus from "~api/images/getStatus";
import authorizeFlow from "../flows/authorizeFlow";
import { ActionWithPayload } from "~types/actions";
import checkOutImageInQueue from "~api/images/queue/checkOutImageInQueue";

function* tabComplete({
    payload: {
        tab: { url },
    },
}: ActionWithPayload<ChromeTabArgs>): SagaIterator {
    if (findImageUrl(url)) {
        try {
            yield put(addImageLinkToStore(url));
        } catch {}
        // TODO WIP

    }
}

function* updateImageStatus({
    payload: url,
}: ActionWithPayload<string>): SagaIterator {
    try {
        const hasPermission = yield select(
            ({ login: { hasPermission: hasPerm } }) => hasPerm,
        );
        const isImageResource = !!findImageUrl(url);
        if (hasPermission && isImageResource) {
            try {
                yield put(setLoading(true));
                const { isExistInBD } = yield call(
                    authorizeFlow,
                    getStatus,
                    url,
                );
                if (!isExistInBD) {
                    const { isExistInQueue } = yield call(
                        authorizeFlow,
                        checkOutImageInQueue,
                        url,
                    );

                    if (isExistInQueue) {
                        yield put(setInQueue(url));
                    } else {
                        yield put(resetImage(url));
                    }
                    yield put(setLoading(false));
                } else {
                    yield put(setAdded(url));
                }
            } catch (error) {
                yield put(chromeError(error));
            }
        }
    } catch {}
}

function* tabChanged({
    payload: { url },
}: ActionWithPayload<ChromeTabArgs["tab"]>): SagaIterator {
    try {
        yield put(updateImage(url));
    } catch (error) {
        yield put(chromeError(error));
    }
}

export default function* findImage(): SagaIterator {
    yield takeEvery(CHROME_TAB_COMPLETE, tabComplete);
    yield takeEvery(TAB_CHANGED, tabChanged);
    yield takeEvery([ADD_IMAGE_LINK_TO_STORE, UPDATE_IMAGE], updateImageStatus);
}
