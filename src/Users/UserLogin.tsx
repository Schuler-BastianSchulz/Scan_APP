import React, {useReducer} from "react";
import UserContext from '../Contexts/UserContext'
import {USER_LOGIN} from  '../Contexts/UserReducer'
import {Redirect} from "react-router";
import {useTranslation} from "react-i18next";
import objUser, {IUserModel} from '../Modules/User'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import config from "../Config";
import globals from "../Helpers/Globals";

export const UserLogin = () => {
    const initialState = {
        email: config.defaultEmail,
        password: config.defaultPassword,
        isSubmitting: false,
        errorMessage: "",
        redirectToForgot: false,
        redirectToMain: false,
    }

    const { dispatchUser } = React.useContext(UserContext);
    const { t } = useTranslation()

    const [state, setState] = React.useState(initialState);

    const handleFormSubmit = (event: any) => {
        event.preventDefault();

        if (!state.email) {
            setState({
                ...state,
                errorMessage: t("Please enter email"),
            })
            return
        }
        if (!state.password) {
            setState({
                ...state,
                errorMessage: t("Please enter password"),
            })
            return
        }

        objUser.login(state.email, state.password, data => {
            if (data.success) {

                    dispatchUser({
                    type: USER_LOGIN,
                    payload: {
                        user: data,
                        // token: user.auth_key,
                    }
                })
            } else {
                setState({
                    ...state,
                    errorMessage: (data.message) ? t(data.message) : t("Invalid Credentials"),
                })
            }
        })

    }

    const changeInput = (event: any) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const gotoForgot = () => {
        setState({
            ...state,
            redirectToForgot: true,
        })
    }

    if (state.redirectToForgot) {
        return (
            <Redirect to="/login/forgot"/>
        )
    }

    return (
        <div className="loginForm ">
                <div>
                    <form onSubmit={handleFormSubmit}>
                        <h1>Login</h1>

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
                                placeholder={t('Email Address')}
                            />
                        </div>

                        <div>
                            <label htmlFor="password">
                                {t('Password')}
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={state.password}
                                onChange={changeInput}
                                placeholder={t('Password')}
                            />
                        </div>

                        {
                            (state.errorMessage) && (
                                <div className="error">
                                    {state.errorMessage}
                                </div>
                            )
                        }
                        <div>
                            <button className="btn">
                                <FontAwesomeIcon icon={faSignInAlt} fixedWidth={true} />
                                {t('Login')}
                            </button>
                        </div>
                        <div style={{"display": "none"}}>
                            <span onClick={gotoForgot}>{t('Forgot Password')}?</span>
                        </div>

                    </form>
                </div>

        </div>
    )
}

export default UserLogin