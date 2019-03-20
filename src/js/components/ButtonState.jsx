import React, { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBan,
    faPlus,
    faShippingFast,
    faSignInAlt,
    faSync,
    faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import {
    chain,
    isNull,
} from "lodash";
import PropTypes from "prop-types";
import {
    canAdd,
    isAdded,
    isQueue,
} from "../helpers/image";

const mapStateToProps = ({
    login: {
        auth: { userId = null } = {},
        checkFailed = null,
        hasPermission = null,
        loading,
    } = {},
    images: {
        [window.location.href]: image = false,
    } = {},
}) => ({
    loginIn: !!userId,
    checkFailed,
    hasPermission,
    image,
    loading,
});

const ButtonState = ({
    loginIn = null,
    checkFailed = null,
    hasPermission = null,
    loading = false,
    image,
}) => (
    <>
        <FontAwesomeIcon
            icon={chain([
                loading && faSync,
                !loginIn && faSignInAlt,
                !isNull(checkFailed) && !hasPermission && faUnlock,
                checkFailed === true && faBan,
                isQueue(image) && faShippingFast,
                isAdded(image) && faBan,
                canAdd(image) && faPlus,
                faSync,
            ]).compact().first().value()}
        />
        {chain([
            loading && "Загрузка...",
            !loginIn && "Авторизоваться",
            !isNull(checkFailed) && !hasPermission && "Проверка прав доступа",
            checkFailed === true && "Нет прав доступа",
            isQueue(image) && "В очереди",
            isAdded(image) && "Уже добавлено",
            canAdd(image) && "Добавить",
            "Загрузка...",
        ]).compact().first().value()}
    </>
);

ButtonState.propTypes = {
    loginIn: PropTypes.bool,
    loading: PropTypes.bool,
    checkFailed: PropTypes.bool,
    hasPermission: PropTypes.bool,
    image: PropTypes.string,
};

export default memo(connect(mapStateToProps)(ButtonState));
