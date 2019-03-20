import React from "react";
import { render } from "react-dom";
import {
    applyMiddleware,
    Store,
} from "react-chrome-redux";
import App from "../App";
import { middleware } from "../store/configureStore";

const store = applyMiddleware(new Store({ portName: "FUR_PAGE" }), ...middleware);
const renderApp = (Application, mountNode) => {
    render(<Application
        store={store}
        isSite={true}
    />, mountNode);
};
const appContainer = document.createElement("div");
appContainer.id = "furpage-app";
document.body.prepend(appContainer);
renderApp(
    App,
    document.getElementById("furpage-app"),
);
