import React, {useContext, useEffect, useState} from "react";
import UserContext from '../../Contexts/UserContext'
import {Route, BrowserRouter as Router, Switch, useLocation, useParams, useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import CardElement from './CardElement'
import BarCodeScanButtonWrapper from "../../Components/BarCodeScanButtonWrapper";

export interface IContainerMaterialPageProps {
    containerNew: number,
    containerOld: number,
    total: any[],
    new: {},
    old: {},
    broken: {},
    onScan: (data: string) => void,
    fakeScanResult?: string,
    isScanDisabled?: boolean,
}

const initialState = {
    container: "",
    location: {} as any,
    layout_image_svg: "",
    isShowDetails: false,
}

export const ContainerMaterialPage = (props: IContainerMaterialPageProps ) => {
    let location = useLocation()
    let history = useHistory()
    let { container } = useParams();
    const [state, setState] = useState(initialState)
    const {stateUser} = useContext(UserContext);
    const { t } = useTranslation()

    const inactiveMaterials = (props.containerNew == 0) ? "inactive" : ""

    const onScanResult = (data: string, isCancelled: boolean, format: string, scanCallback?: ()=>void) => {
        if (isCancelled) {
        } else {
            setTimeout(()=>{
                // if (scanCallback) scanCallback()
                props.onScan(data)
            }, 5)
        }
    }

    const new_length = Object.keys(props.new).length
    const old_length = Object.keys(props.old).length
    const broken_length = Object.keys(props.broken).length
    const isActive = props.containerOld != 0 || (new_length != 0 || old_length != 0 || broken_length != 0)

    return (
        <div className="block_page block_page_material" contentEditable={false}>
            <BarCodeScanButtonWrapper onResult={onScanResult}
                                      onScreenMessage={t("Place the materials barcode inside the scan area")}
                                      fakeResult={props.fakeScanResult}
                                      isScanDisabled={props.isScanDisabled}
            >
                <div><span className={inactiveMaterials}></span></div>
            </BarCodeScanButtonWrapper>

            <div>
                <CardElement
                    onTop={"NEUE STAPELINFORMATION"}
                    onValue={new_length}
                    onBottom={"HINZUGEFÜGT"}
                    isActive={isActive}
                />
                <CardElement
                    onTop={"ALTE STAPELINFORMATION"}
                    onValue={old_length}
                    onBottom={"VERBLEIBEN"}
                    isActive={isActive}
                />
                <CardElement
                    onTop={"FEHLTEILE:"}
                    onValue={broken_length}
                    onBottom={" "}
                    isActive={isActive}
                />
            </div>
        </div>
    )
}
export default ContainerMaterialPage