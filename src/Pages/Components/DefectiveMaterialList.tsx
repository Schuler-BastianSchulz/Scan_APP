import React, {useContext, useEffect, useState} from "react";
import UserContext from '../../Contexts/UserContext'
import {Route, BrowserRouter as Router, Switch, useLocation, useParams, useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import CardElement from './CardElement'
import BarCodeScanButtonWrapper from "../../Components/BarCodeScanButtonWrapper";
import globals from "../../Helpers/Globals";

export interface IDefectiveMaterialListProps {
    onTop: string,
    defective: string[],
}

const initialState = {
    container: "",
    location: {} as any,
    layout_image_svg: "",
    isShowDetails: false,
}

export const DefectiveMaterialList = (props: IDefectiveMaterialListProps ) => {
    let location = useLocation()
    const { t } = useTranslation()

    const list = props.defective.map((row)=>{
        return <DefectiveMaterialItem title={row} key={row} />
    })

    return (
        <div className="block_elem block_elem_defective">
            <div>{props.onTop}</div>
            <div className="number2">
                {list}
            </div>
        </div>
    )
}

interface IDefectiveMaterialItemProps {
    title: string,
}

const DefectiveMaterialItem = (props: IDefectiveMaterialItemProps ) => {
    let location = useLocation()
    const { t } = useTranslation()

    return (
        <div>
            {props.title}
        </div>
    )
}

export default DefectiveMaterialList