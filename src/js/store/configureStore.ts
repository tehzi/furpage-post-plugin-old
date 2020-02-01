import { applyMiddleware, compose, createStore, Reducer, Store } from "redux";
import { wrapStore } from "react-chrome-redux";
import { composeWithDevTools } from "remote-redux-devtools";
import createSagaMiddleware from "redux-saga";
import AppStore from "~types/AppStore";

export const isDevelopment = process.env.NODE_ENV === "development";
export const sagaMiddleware = createSagaMiddleware();
export const middleware = [sagaMiddleware];

export default function configureStore(
    reducer: Reducer<AppStore>,
): Store<AppStore> {
    const composeEnhancers = isDevelopment
        ? composeWithDevTools({
              realtime: true,
              port: 8000,
              hostname: "127.0.0.1",
          })
        : compose;
    const store = createStore(
        reducer,
        composeEnhancers(applyMiddleware(...middleware)),
    );
    wrapStore(store, { portName: "FUR_PAGE" });

    return store;
}
