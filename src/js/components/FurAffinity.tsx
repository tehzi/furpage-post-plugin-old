import React, { FC, memo } from "react";
import { createPortal } from "react-dom";
import { compose } from "redux";
import withSite, { WebsiteComponent } from "~hoc/withSite";
import { findFa } from "~helpers/mode";

export const imgSelector = "#submissionImg";
export const tagSelector = ".tags-row span.tags a";

export interface FurAffinityProps {
    mount: Element;
}

const FurAffinity: FC<FurAffinityProps> = ({ mount, children }) =>
    createPortal(<>{children}</>, mount);

export default compose(
    withSite(findFa(), null, imgSelector, tagSelector),
    memo,
)(FurAffinity) as WebsiteComponent;
