import React, {useContext, useEffect, useReducer} from 'react';
import './App.css';
import './fonts/fonts.css';
import globals from './Helpers/Globals'
import UserContext from './Contexts/UserContext'
import userReducer from './Contexts/UserReducer'

import MainApp from "./Pages/MainApp";
import Users from './Users/Users';

import {HashRouter as Router, Route, Switch, Redirect, useHistory} from "react-router-dom"

import { useTranslation } from 'react-i18next'
import UserLogout from "./Users/UserLogout";

const initialState = {
    isAuthenticated: Object.keys(globals.getStorageJSON("user")).length > 0, //false,
    user: globals.getStorageJSON("user"),
    token: "qq",
};

function Application() {
    const [stateUser, dispatchUser] = useReducer(userReducer, initialState);

    globals.setAuthKey(stateUser.user.auth_key)
    const { t, i18n} = useTranslation()

    let history = useHistory();

    const logout = () => {
        if (stateUser.isAuthenticated) {
            dispatchUser({
                type: "LOGOUT",
            })
        }
    }

    return (
        <UserContext.Provider
            value={{
                stateUser,
                dispatchUser,
                logout
            }}
        >
                    <Switch>
                        <AuthRoute path="/logout" type="private">
                            <UserLogout/>
                        </AuthRoute>
                        <AuthRoute path="/login">
                            <Users/>
                        </AuthRoute>
                        <AuthRoute path="/" type="private">
                            <MainApp />
                        </AuthRoute>
                    </Switch>
        </UserContext.Provider>
    )
}

function AuthRoute(props: any) {
    const {stateUser, logout} = useContext(UserContext);

    if (stateUser.isAuthenticated && (props.type != "private")) {
        return <Redirect to="/" />
    }
    if (!stateUser.isAuthenticated && (props.type == "private")) {
        return <Redirect to="/login" />
    }
    return <Route {...props} />
}

export default Application

