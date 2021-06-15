import React, {useEffect, useState} from "react";
import globals from "../Helpers/Globals";
import {useTranslation} from "react-i18next";
import UserContext from "../Contexts/UserContext";
import DialogPage from "../Forms/DialogPage";

interface ISettingsPageLanguageProps {
    isOpen: boolean,
    title: string,
    onClose: any,
    onSave: any,
}

const initialState = {
    lang: "",
}

export const SettingsPageLanguage = (props: ISettingsPageLanguageProps) => {

    const { t, i18n } = useTranslation()

    const [state, setState] = useState(initialState);

    useEffect(()=>{
        setState({
            lang: i18n.language,
        })
    }, [])

    const onClick = (lang: string) => (e: any) => {
        setState({
            lang: lang,
        })
    }

    const onSave = () => {
        props.onSave(state.lang)
    }

    return (
            <DialogPage isOpen={props.isOpen}
                        title={props.title}
                        onClose={props.onClose}
                        onSave={onSave}
                        btnCancel={t("Cancel")}
                        btnOk={t("OK")}
                >
                <Langs lang={state.lang}>
                    <LangRow title="English" lang="en" onClick={onClick} />
                    <LangRow title="Deutsch" lang="de" onClick={onClick} />
                </Langs>
            </DialogPage>
    )
}

const Langs = (props: any) => {
    let rows = React.Children.map(props.children, (child, i) => {
        return React.cloneElement(child, {
            activeLang: props.lang
        })
    })

    return (
        <>
            {rows}
        </>
    )
}

const LangRow = (props: any) => {
    const isActive = props.lang == props.activeLang
    return (
        <div onClick={props.onClick(props.lang)}>
            <input type="radio" id={props.lang} value={props.lang} checked={isActive}
                   onChange={props.onClick(props.lang)}
            />
            <label htmlFor={props.lang}>{props.title}</label>
        </div>
    )
}

export default SettingsPageLanguage