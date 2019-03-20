import React, { Component } from "react";
import { isElement, last } from "lodash";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "../components/Button";
import { vkAuth } from "../store/actions/login";
import ButtonState from "../components/ButtonState";
import {
    canAdd,
    isAdded,
    isQueue,
} from "../helpers/image";
import { addImage } from "../store/actions/images";

export const pluginMount = "furpage-button-nest";

const mapStateToProps = ({
    updateUrl: { url = null } = {},
    login: {
        auth: { userId = null } = {},
    } = {},
    images: {
        [window.location.href]: image = false,
    } = {},
}) => ({
    url,
    image,
    loginIn: !!userId,
});

const mapDispatchToProps = dispatch => ({
    onStartAuth() {
        dispatch(vkAuth());
    },
    onAddImage(e, image, tagSelector) {
        let tags = [];
        if (tagSelector) {
            tags = Array.from(document.querySelectorAll(tagSelector))
                .map(element => element.innerText);
        }
        dispatch(addImage({
            url: window.location.href,
            image,
            tags,
            title: document.title,
        }));
    },
});

export default function site(condition, selector, tagSelector = false) {
    return compose(
        connect(mapStateToProps, mapDispatchToProps),
        Site => class extends Component {
            static displayName = `site(${Component.displayName})`;

            static propTypes = {
                url: PropTypes.string,
                onStartAuth: PropTypes.func,
                onAddImage: PropTypes.func,
                image: PropTypes.string,
                loginIn: PropTypes.bool,
            };

            image = document.querySelector(selector);

            constructor(props) {
                super(props);
                if (condition && isElement(this.image)) {
                    this.insertRoot();
                }
            }

            shouldComponentUpdate(nextProps) {
                if (!condition || !isElement(this.image)) {
                    return false;
                }
                const {
                    url,
                    loginIn,
                    image: storeImageInfo,
                } = this.props;
                const isUpdate = url !== nextProps.url
                    || loginIn !== nextProps.loginIn
                    || storeImageInfo !== nextProps.image;
                if (isUpdate) {
                    this.image = last([...document.querySelectorAll(selector)]);
                    const isElementAppended = isElement(document.getElementById(pluginMount));
                    if (isElementAppended) {
                        document.getElementById(pluginMount).remove();
                    }
                    this.insertRoot();
                }
                return isUpdate;
            }

            insertRoot = () => {
                const {
                    parentNode,
                    parentNode: { insertBefore = () => {} } = {},
                } = this.image;
                const isElementAppended = isElement(document.getElementById(pluginMount));
                if (!isElementAppended) {
                    const buttonNest = document.createElement("div");
                    buttonNest.id = pluginMount;
                    insertBefore.call(parentNode, buttonNest, this.image.nextSibling);
                }
            };

            render() {
                if (!condition || !isElement(this.image)) {
                    return null;
                }
                const {
                    onStartAuth = () => {},
                    onAddImage = () => {},
                    image,
                    loginIn,
                } = this.props;
                return (
                    <Site
                        {...this.props}
                        mount={document.getElementById(pluginMount)}
                    >
                        <Button
                            warning={!loginIn || isQueue(image)}
                            error={isAdded(image)}
                            onClick={(e) => {
                                if (!loginIn) {
                                    onStartAuth(e);
                                    return;
                                }
                                if (canAdd(image)) {
                                    onAddImage(e, this.image.src, tagSelector);
                                }
                            }}
                        ><ButtonState /></Button>
                    </Site>
                );
            }
        },
    );
}
