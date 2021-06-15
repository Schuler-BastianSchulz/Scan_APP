import React, {useContext, useEffect, useState} from "react";
import UserContext from '../../Contexts/UserContext'
import {Route, BrowserRouter as Router, Switch, useLocation, useParams, useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";

export interface ICardElementPageProps {
    onTop: string,
    onValue: number,
}

export const CardElementPage = (props: ICardElementPageProps) => {
    const showValue = () => {
        let s = "" + props.onValue
        while (s.length < 5) s = "0" + s
        return s
    }

    const inactive = (props.onValue == 0) ? "inactive" : "";

    return (
        <div className="block_elem block_elem_page">
            <div className={inactive}>
                {props.onTop}
            </div>
            <div className={"number " + inactive}>
                {showValue()}
            </div>

        </div>
    )
}
export default CardElementPage