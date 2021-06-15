import React, {useEffect, useRef, useState} from "react";
import UserContext from '../Contexts/UserContext'
import {USER_LOGOUT} from '../Contexts/UserReducer'
import {Redirect, useHistory} from "react-router";
import objUser from '../Modules/User'

export const UserLogout = () => {

    const { logout } = React.useContext(UserContext);

    useEffect(()=>{
         objUser.logout(()=>{
             logout()
         })
    }, [])

    return (null)
}

export default UserLogout