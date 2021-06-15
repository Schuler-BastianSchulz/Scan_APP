import React, {useEffect} from "react";
import UserLogin from "./UserLogin";
import UserForgotPassword from "./UserForgotPassword";
import {HashRouter as Router, Route, useRouteMatch, Redirect, Switch, Link} from "react-router-dom";
import UserLogout from "./UserLogout";
import logo1 from '../images/sintra_icon_only.png'
import logo2 from '../images/app_logo.png'
import {useTranslation} from "react-i18next";
import FlagIcon, {getIconFlagByLang} from '../Helpers/FlagIcon'
import SelectLanguage from "../Forms/SelectLanguage";
import config from '../Config'



export const Users = () => {

    const { t, i18n } = useTranslation()

    let { path, url } = useRouteMatch();
    return (
        <>
            <header>
                <div className="logo">
                    <img src={logo1} />
                    <span>{config.appTitle}</span>
                </div>
                <div className="buttons">
                    <SelectLanguage>
                        <FlagIcon code={getIconFlagByLang(i18n.language)} size='2x' />
                    </SelectLanguage>
                </div>
            </header>

            <div className="loginwindow">
            <div className="logoapp">
                <img src={logo2} />
            </div>
            <Switch>
                <Route exact path="/login">
                    <UserLogin/>
                </Route>
                <Route path="/login/forgot">
                    <UserForgotPassword/>
                </Route>
                <Route path="/login/logout">
                    <UserLogout />
                </Route>
            </Switch>

            <footer >
                &copy; 2021 Schuler Consulting <br/>
                &copy; 2021 Sinfosy Innovation for you
            </footer>
        </div>
            </>
    )
}

export default Users