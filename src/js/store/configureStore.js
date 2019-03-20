import {
    applyMiddleware,
    compose,
    createStore,
} from "redux";
import { wrapStore } from "react-chrome-redux";
import { composeWithDevTools } from "remote-redux-devtools";
import createSagaMiddleware from "redux-saga";

export const isDev = process.env.NODE_ENV === "development";
export const sagaMiddleware = createSagaMiddleware();
export const middleware = [
    sagaMiddleware,
];

export default function configureStore(reducer) {
    const composeEnhancers = isDev ? composeWithDevTools({ realtime: true }) : compose;
    const store = composeEnhancers(applyMiddleware(...middleware))(createStore)(reducer);
    wrapStore(store, { portName: "FUR_PAGE" });
    return store;
}
