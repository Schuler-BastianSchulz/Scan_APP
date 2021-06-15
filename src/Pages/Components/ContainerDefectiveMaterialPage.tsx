import React, {useContext, useEffect, useState} from "react";
import UserContext from '../../Contexts/UserContext'
import {Route, BrowserRouter as Router, Switch, useLocation, useParams, useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import CardElement from './CardElement'
import BarCodeScanButtonWrapper from "../../Components/BarCodeScanButtonWrapper";
import DefectiveMaterialList from "./DefectiveMaterialList";

export interface IContaineDefectiveMaterialPageProps {
    containerNew: number,
//    containerOld: number,
    onScan: (data: string) => void,
    fakeScanResult?: string,
    isScanDisabled?: boolean,
    defective: string[],
}

const initialState = {
    container: "",
    location: {} as any,
    layout_image_svg: "",
    isShowDetails: false,
}

export const ContainerDefectiveMaterialPage = (props: IContaineDefectiveMaterialPageProps ) => {
    let location = useLocation()
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

    return (
        <div className="block_page block_page_material" contentEditable={false}>
            <BarCodeScanButtonWrapper onResult={onScanResult}
                                      onScreenMessage={t("Place the defective material barcode inside the scan area")}
                                      fakeResult={props.fakeScanResult}
                                      isScanDisabled={props.isScanDisabled}
            >
                <div><span className={inactiveMaterials}></span></div>
            </BarCodeScanButtonWrapper>

            <div>
                <DefectiveMaterialList
                    onTop={"Defective"}
                    defective={props.defective}
                />
            </div>
        </div>
    )
}
export default ContainerDefectiveMaterialPage