import React, {useContext, useEffect, useState} from "react";
import UserContext from '../../Contexts/UserContext'
import {Route, BrowserRouter as Router, Switch, useLocation, useParams, useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import CardElementPage from './CardElementPage'
import BarCodeScanButtonWrapper from '../../Components/BarCodeScanButtonWrapper'

export interface IContainerPageProps {
    containerNew: number,
    containerOld: number,
    onScan: (result: string) => void
    fakeScanResult?: string
}

const initialState = {
    container: "",
    location: {} as any,
    layout_image_svg: "",
    isShowDetails: false,
}

export const ContainerPage = (props: IContainerPageProps ) => {
    let location = useLocation()
    let history = useHistory()
    let { container } = useParams();
    const [state, setState] = useState(initialState)
    const {stateUser} = useContext(UserContext);
    const { t } = useTranslation()


    const inactive = (props.containerNew == 0) ? "" : "inactive"

    const onScanResult = (data: string, isCancelled: boolean, format: string, scanCallback?: ()=>void) => {
        if (isCancelled) {
        } else {
            setTimeout(()=>{
                // if (scanCallback) scanCallback()
                props.onScan(data)
            }, 5)
        }
    }

    return (
        <div className="block_page">
            <BarCodeScanButtonWrapper onResult={onScanResult}
                                      onScreenMessage={t("Place the container barcode inside the scan area")}
                                      fakeResult={props.fakeScanResult}
            >
                <div><span className={inactive}></span></div>
            </BarCodeScanButtonWrapper>

            <div>
                <CardElementPage
                    onTop={"NEUE CONTAINER NUMMER"}
                    onValue={props.containerNew}
                />
                <CardElementPage
                    onTop={"ALTE CONTAINER NUMMER"}
                    onValue={props.containerOld}
                />
            </div>
        </div>
    )
}
export default ContainerPage