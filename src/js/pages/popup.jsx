import React from "react";
import { render } from "react-dom";
import {
    applyMiddleware,
    Store,
} from "react-chrome-redux";
import { middleware } from "../store/configureStore";
import App from "../App";

const renderApp = (Application, mountNode) => {
    const store = applyMiddleware(new Store({ portName: "FUR_PAGE" }), ...middleware);
    return (
        render(
            <Application
                store={store}
                isPopup={true}
            />,
            mountNode,
        )
    );
};

document.addEventListener(
    "DOMContentLoaded",
    () => renderApp(App, document.getElementById("app")),
);
