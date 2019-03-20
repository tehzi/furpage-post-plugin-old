import { combineReducers } from "redux";
import updateUrl from "./updateUrl";
import login from "./login";
import images from "./images";

export default function createReducers() {
    return (
        combineReducers({
            updateUrl,
            login,
            images,
        })
    );
}
