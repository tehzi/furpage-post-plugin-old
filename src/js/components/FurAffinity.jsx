import React, { memo } from "react";
import { createPortal } from "react-dom";
import { compose } from "redux";
import PropTypes from "prop-types";
import site from "../hoc/site";
import { findFa } from "../helpers/mode";

export const imgSelector = "#submissionImg";
export const tagSelector = ".tags-row span.tags a";

const FurAffinity = ({
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

FurAffinity.propTypes = {
    mount: PropTypes.string,
};

export default compose(
    site(findFa(), imgSelector, tagSelector),
    memo,
)(FurAffinity);
