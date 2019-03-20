import React, { memo } from "react";
import { createPortal } from "react-dom";
// import PropTypes from "prop-types";
import { compose } from "redux";
import PropTypes from "prop-types";
import site from "../hoc/site";
import { findDa } from "../helpers/mode";

export const imgSelector = ".dev-view-deviation img.dev-content-full";

const DeviantArt = ({
    mount,
    children,
}) => (
    createPortal(
        <>
            {children}
        </>,
        mount,
    )
);

DeviantArt.propTypes = {
    mount: PropTypes.string,
};

export default compose(
    site(findDa(), imgSelector),
    memo,
)(DeviantArt);
