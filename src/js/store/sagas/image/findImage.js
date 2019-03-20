import {
    call,
    put,
    select,
    takeEvery,
} from "redux-saga/effects";
import {
    setLoading,
} from "../../actions/login";
import {
    CHROME_TAB_COMPLETE,
    chromeError,
    TAB_CHANGED,
} from "../../actions/chrome";
import { findImageUrl } from "../../../helpers/mode";
import {
    ADD_IMAGE_LINK_TO_STORE,
    addImageLinkToStore,
    resetImage,
    setAdded,
    setInQueue,
    UPDATE_IMAGE,
    updateImage,
} from "../../actions/images";
import getStatus from "../../../api/images/getStatus";

function* tabComplete({ payload: { tab: { url } } }) {
    if (findImageUrl(url)) {
        yield put(addImageLinkToStore(url));
        // function getBase64Image(img) {
        //     // Create an empty canvas element
        //     var canvas = document.createElement("canvas");
        //     canvas.width = img.width;
        //     canvas.height = img.height;
        //
        //     // Copy the image contents to the canvas
        //     var ctx = canvas.getContext("2d");
        //     ctx.drawImage(img, 0, 0);
        //
        //     // Get the data-URL formatted image
        //     // Firefox supports PNG and JPEG. You could check img.src to
        //     // guess the original format, but be aware the using "image/jpg"
        //     // will re-encode the image.
        //     var dataURL = canvas.toDataURL("image/png");
        //
        //     return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        // }
    }
}

function* updateImageStatus({ payload: url }) {
    const hasPermission = yield select(({ login: { hasPermission: hasPerm } }) => hasPerm);
    if (hasPermission) {
        try {
            yield put(setLoading(true));
            const { base = "0", queue = "0" } = yield call(getStatus, url);
            yield put(setLoading(false));
            if (queue > 0) {
                yield put(setInQueue(url));
            }
            if (base > 0) {
                yield put(setAdded(url));
            }
            if ([base, queue].every(item => item === "0")) {
                yield put(resetImage(url));
            }
        } catch (err) {
            yield put(chromeError(err));
        }
    }
}

function* tabChanged({ payload: { url } }) {
    yield put(updateImage(url));
}

export default function* findImage() {
    yield takeEvery(CHROME_TAB_COMPLETE, tabComplete);
    yield takeEvery(TAB_CHANGED, tabChanged);
    yield takeEvery([ADD_IMAGE_LINK_TO_STORE, UPDATE_IMAGE], updateImageStatus);
}
