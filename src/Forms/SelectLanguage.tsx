import React, {useContext, useEffect, useReducer, useRef} from "react";
import UserContext from '../Contexts/UserContext'

import {useTranslation} from "react-i18next";
import SettingsPageLanguage from "./SettingsPageLanguage";
const initialState = {
    isOpen: false,
}

export const SelectLanguage = (props: any) => {
    const {stateUser, logout} = useContext(UserContext);

    const [state, setState] = React.useState(initialState);
    const { t, i18n } = useTranslation()

    const modalClick = () => {
        setState({
            isOpen: !state.isOpen
        })
    }

    const onSave = (lang: string) => {
        i18n.changeLanguage(lang, () => {
            modalClick()
        })
    }

    return (
        <>
        <span onClick={modalClick}>
            {props.children}
        </span>
            <SettingsPageLanguage
                isOpen={state.isOpen}
                title={t('settings.Language')}
                onClose={modalClick}
                onSave={onSave}
            />
        </>
    )
}

export default SelectLanguage