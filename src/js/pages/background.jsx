import "../../images/icon_19.png";
import "../../images/icon_128.png";
import React from "react";
import { render } from "react-dom";
import App from "../App";
import configureStore from "../store/configureStore";
import createReducers from "../store/reducers";

const appContainer = document.createElement("div");
appContainer.id = "app";
document.body.append(appContainer);
const renderApp = (Application, mountNode) => {
    const store = configureStore(createReducers());
    return (
        render(<Application
            store={store}
        />, mountNode)
    );
};
renderApp(App, document.getElementById("app"));
