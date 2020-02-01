import React, { memo, FC} from "react";
import { createPortal } from "react-dom";
import { compose } from "redux";
import withSite, { SiteComponent } from "~hoc/withSite";
import { findDa } from "~helpers/mode";

export const imgSelector =
    ".dev-view-deviation img.dev-content-full, [role='main'] img";

export const containerSelector = "";

export interface DeviantArtProps {
    mount: Element;
}

const DeviantArt: FC<DeviantArtProps> = ({ mount, children }) =>
    createPortal(<>{children}</>, mount);

export default compose(
    withSite(findDa(), containerSelector, imgSelector),
    memo,
)(DeviantArt) as SiteComponent;
