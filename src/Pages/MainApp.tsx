import React, {useContext, useEffect, useReducer, useRef, useState} from "react";
import UserContext from '../Contexts/UserContext'

import logo1 from '../images/sintra_icon_only.png'
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import FlagIcon, {getIconFlagByLang} from '../Helpers/FlagIcon'
import SelectLanguage from "../Forms/SelectLanguage";
import CurrentPage from "./CurrentPage";
import config from "../Config";

const initialState = {
    currentTime: 0 as number,
}

export const MainApp = () => {
    const {stateUser, logout} = useContext(UserContext);

    const [state, setState] = useState(initialState);
    const { t, i18n } = useTranslation()

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
                    <Link to="/logout">
                        <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
                    </Link>
                </div>
            </header>
            <div className="page">
                <CurrentPage />
            </div>
        </>
    )
}

export default MainApp