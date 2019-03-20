import "@babel/polyfill";
import React, { StrictMode } from "react";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import rootSaga from "./store/sagas/rootSaga";
import { sagaMiddleware } from "./store/configureStore";
import FurAffinity from "./components/FurAffinity";
import DeviantArt from "./components/DeviantArt";
import Popup from "./components/Popup";

const App = ({
    store,
    isSite = false,
    isPopup = false,
}) => {
    sagaMiddleware.run(rootSaga);
    return (
        <StrictMode>
            <Provider store={store}>
                <>
                    {isSite && <>
                        <FurAffinity />
                        <DeviantArt />
                    </>}
                    {isPopup && <Popup />}
                </>
            </Provider>
        </StrictMode>
    );
};

App.propTypes = {
    store: PropTypes.object.isRequired,
    isPopup: PropTypes.bool,
    isSite: PropTypes.bool,
};

export default App;
