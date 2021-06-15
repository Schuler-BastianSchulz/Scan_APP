import React, {useEffect, useRef} from "react";
import UserContext from '../Contexts/UserContext'
import {USER_FORGOT} from  '../Contexts/UserReducer'
import {Redirect} from "react-router";
import {useTranslation} from "react-i18next";
import globals from "../Helpers/Globals";

export const UserForgotPassword = () => {
    let timerAuto: number = 0
    let timerAutoRef = useRef(timerAuto)

    const initialState = {
        email: "",
        isSubmitting: false,
        errorMessage: "",
        isOkMessage: false,
        redirectToLogin: false,
    }

    const { dispatchUser } = React.useContext(UserContext);
    const [state, setState] = React.useState(initialState);
    const { t } = useTranslation()

    const gotoLogin = () => {
        if (timerAutoRef.current) clearTimeout(timerAutoRef.current)

        setState({
            ...state,
            redirectToLogin: true,
        })
    }

    useEffect(()=>{
        return () => {
            if (timerAutoRef.current) clearTimeout(timerAutoRef.current)
        }
    }, [])

    const handleFormSubmit = (event: any) => {
        event.preventDefault();

        // console.log('handleFormSubmit')
        if (state.isOkMessage) {
            gotoLogin()
            return
        }

        if (!state.email) {
            setState({
                ...state,
                errorMessage: t("Please enter email"),
            })
            return
        }

        dispatchUser({
            type: USER_FORGOT,
            payload: {
                user: {
                    email: state.email,
                },
            }
        })

        setState({
            ...state,
            errorMessage: "",
            isOkMessage: true,
        })

        timerAutoRef.current = window.setTimeout(()=>{
            gotoLogin()
        }, 10000)

    }

    const changeInput = (event: any) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    if (state.redirectToLogin) {
        return (
            <Redirect to="/login"/>
        )
    }

    return (
        <div className="loginForm">
                <div >
                    <form onSubmit={handleFormSubmit}>
                        <h1>{t("Forgot Password")}</h1>

                        {
                            (state.isOkMessage) && (
                                <div>
                                    {t('Check email box for recovery email and try to login')}
                                </div>
                            )
                        }

                        {
                            (!state.isOkMessage) && (
                                <div>
                                    <label htmlFor="email">
                                        {t('Email Address')}
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={state.email}
                                        onChange={changeInput}
                                        placeholder={t('email')}
                                    />
                                </div>
                            )
                        }

                        {
                            (state.errorMessage) && (
                                <div className="error">
                                    {state.errorMessage}
                                </div>
                            )
                        }

                        {
                            (!state.isOkMessage) && (
                                <>
                                <div>
                                    <button type="submit">
                                        {t('Recover Password')}
                                    </button>
                                </div>
                                <div>
                                    <button type="button" onClick={gotoLogin}>
                                        {t("Back to Login")}
                                    </button>
                                </div>
                                </>
                            )
                        }

                        {
                            (state.isOkMessage) && (
                                <button type="submit">
                                    {t('Back to Login')}
                                </button>
                            )
                        }
                    </form>
                </div>
        </div>
    )
}

export default UserForgotPassword