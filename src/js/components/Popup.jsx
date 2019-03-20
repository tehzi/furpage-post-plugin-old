import React, { memo } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "./Button";
import {
    deleteAuth,
    vkAuth,
} from "../store/actions/login";

const mapStateToProps = ({
    login: {
        auth: {
            userId = null,
        } = {},
    } = {},
}) => ({
    loginIn: !!userId,
});

const mapDispatchToProps = dispatch => ({
    onAuthToggle(e, loginIn) {
        dispatch(loginIn ? deleteAuth() : vkAuth());
    },
});

const Popup = ({
    loginIn = false,
    onAuthToggle = () => {},
}) => (
    <Button
        onClick={e => onAuthToggle(e, loginIn)}
    >
        {loginIn && <>Удалить авторизацию</>}
        {!loginIn && <>Авторизоваться</>}
    </Button>
);

Popup.propTypes = {
    loginIn: PropTypes.bool,
    onAuthToggle: PropTypes.func,
};

export default memo(connect(mapStateToProps, mapDispatchToProps)(Popup));
