import React, {useContext, useEffect, useState} from "react";
import UserContext from '../../Contexts/UserContext'
import {Route, BrowserRouter as Router, Switch, useLocation, useParams, useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";

export interface ICardElementProps {
    onTop: string,
    onValue: number,
    onBottom: string,
    isActive: boolean
}

export const CardElement = (props: ICardElementProps) => {
    const inactive = (props.isActive) ? "" : "inactive"

    return (
        <div className="block_elem">
            <div className={inactive}>
                {props.onTop}
            </div>
            <div className={"number " + inactive}>
                {props.onValue} Teil(e)
            </div>
            <div className={inactive}>
                {props.onBottom}
            </div>
        </div>
    )
}
export default CardElement