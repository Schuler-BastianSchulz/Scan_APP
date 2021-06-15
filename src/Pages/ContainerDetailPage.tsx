import React, {useContext, useEffect, useState} from "react";
import UserContext from '../Contexts/UserContext'
import {Route, BrowserRouter as Router, Switch, useLocation, useParams, useHistory} from "react-router-dom";
// import ScanAndShowHistoryPage from "./ScanAndShowHistoryPage";
// import objContainer from "../Modules/Container";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
// import {createPrivateKey} from "crypto";
import {useTranslation} from "react-i18next";
import globals from "../Helpers/Globals";

export interface IContainerDetailPageProps {
    container: string,
    details: any,
    image: string,
    onBack: () => void
}

const initialState = {
    container: "",
    location: {} as any,
    layout_image_svg: "",
    isShowDetails: false,
}

export const ContainerDetailPage = (props: IContainerDetailPageProps) => {
    let location = useLocation()
    let history = useHistory()
    let { container } = useParams();
    const [state, setState] = useState(initialState)
    const {stateUser} = useContext(UserContext);
    const { t } = useTranslation()

    globals.log("ContainerDetailPage: "+JSON.stringify(location))

    const asBase64 = false

    // const imgData = "data:image/svg+xml;base64," + state.layout_image_svg
    const imgData = (asBase64) ? "data:image/svg+xml;base64," + props.image : props.image

    return (
        <div>
            <div className="layoutImg">
                <img className="bg" src={imgData} />
                <img className="fg" src={imgData} />
            </div>

            <div className="centered maxWidthDialog spaced">
                <h2>Container Code {props.container}</h2>

                <div>
                    <button>{t("Correct Location")}</button>
                </div>
                <div>
                    <button>{t("Store Location")}</button>
                </div>
                <div>
                    <button className="btn btnDanger" onClick={props.onBack}>{t("Cancel")}</button>
                </div>
            </div>
        </div>
    )
}
export default ContainerDetailPage