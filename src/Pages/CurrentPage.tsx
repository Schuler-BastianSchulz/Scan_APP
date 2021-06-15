import React, {useContext, useEffect, useState} from "react";
import UserContext from '../Contexts/UserContext'
import {Route, BrowserRouter as Router, Switch, useLocation} from "react-router-dom";
import ContainerPage from "./Components/ContainerPage"
import ContainerMaterialPage from "./Components/ContainerMaterialPage";
import {useTranslation} from "react-i18next";
import objContainerMaterial from '../Modules/ContainerMaterials'
import ContainerDefectiveMaterialPage from "./Components/ContainerDefectiveMaterialPage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt, faSpinner} from "@fortawesome/free-solid-svg-icons";
import globals from "../Helpers/Globals";

const initialState = {
    isLoading: false,
    containerNew: 0,
    containerOld: 0,
    isDefectiveContainer: false,

    new: {},
    old: {},
    broken: {},

    defective: [] as string[],

    fakeQrContainer: "00129",
    fakeQrMaterail: "<<471123>><<FB;302x365x19>><<471129>><<MS;1795x426x19>><<471137>><<UB;906x480x19>>",
    fakeQrDefectiveMaterail: '471123',

    currentString: "",
}

export const CurrentPage = (props: any) => {
    let location = useLocation()
    const { t } = useTranslation()
    const [state, setState] = useState(initialState)
    const {stateUser} = useContext(UserContext);

    const onPaste = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
    }

    const onKeyDown = (e: any) => {
        switch( e.keyCode ) {
            case 27:
                e.stopPropagation();
                clickReset()
                break;
            case 13:
                e.stopPropagation();
                analyzeString()
                break;
            default:
                if (e.key.length == 1 && !e.ctrlKey && !e.altKey) {
                    e.stopPropagation();
                    setState({
                        ...state,
                        currentString: state.currentString + e.key
                    })
                }
                break;
        }
    }

    const analyzeString = () => {
        let s = state.currentString
        globals.log(s)
        if (s.length == 0) {
            clickSave()
        } else
        if (isValidContainerNumber(s)) {
            onScanContainer(s)
        } else {
            if (state.isDefectiveContainer) {
                onScanDefectiveMaterials(s)
            } else {
                onScanMaterials(s)
            }
        }

    }

    const isValidContainerNumber = (data: string): boolean => {
        let value = Number(data)

        if (0 < value && value < 1000) {
            return true
        }
        return false
    }

    const onScanContainer = (data: string) => {
        let value = Number(data)

        if (isValidContainerNumber(data)) {
            setState({
                ...state,
                containerNew: value,
                isDefectiveContainer: (996 <= value) && (value <= 999),
                new: {},
                old: {},
                broken: {},

                defective: [],
                currentString: '',
            })
        }
    }

    const onScanMaterials = (data: string) => {
        if (state.containerNew == 0) return

        data = data.trim()
        let isError = true
        let filename = ""
        let materials = {} as any
        if (data.length > 5 && data.substr(data.length - 4) == '.csv') {
            // filename...
            filename = data
            isError = false
            globals.log('filename: ' + filename)
        } else {
            // raw data
            if (data.substr(0, 2) === "<<") {
                if (data.substr(data.length-2, 2) === ">>") {
                    data = data.substr(2, data.length-4)

                    let arr = data.split(">><<")
                    if (arr.length %2 == 0) {
                        isError = false
                        for(let i=0;i<arr.length;i=i+2) {
                            const key = arr[i].trim()
                            const val = arr[i+1].trim()
                            if (key.indexOf('<') > -1 || key.indexOf('>') > -1) {
                                isError = true
                                break
                            }
                            if (val.indexOf('<') > -1 || val.indexOf('>') > -1) {
                                isError = true
                                break
                            }
                            materials[ key ] = val
                        }
//                        globals.log(materials)
                    }
                }
            }
        }

        if (!isError) {
            setState({
                ...state,
                currentString: '',
                isLoading: true
            })

            objContainerMaterial.customValidateMaterialsForNewContainer(
                state.containerNew, stateUser.user, materials, filename, data => {
                    if (data.success) {

                        setState({
                            ...state,
                            new: data.new,
                            old: data.old,
                            broken: data.broken,
                            containerOld: data.containerOld,
                            currentString: '',
                            isLoading: false
                        })

                    } else {
                        alert((data.message) ? t(data.message) : t("Invalid Credentials"))
                        setState({
                            ...state,
                            isLoading: false
                        })
                    }
                })
        }

        if (isError) {
            alert('Data error')

            setState({
                ...state,
                currentString: '',
            })
        }
    }

    const onScanDefectiveMaterials = (data: string) => {
        let defective = [...state.defective]
        if (defective.indexOf(data) == -1) {
            defective.push(data)
            setState({
                ...state,
                defective: defective,
                currentString: '',
            })
        }
    }

    const clickReset = () => {
        setState({
            ...state,
            containerNew: 0,
            containerOld: 0,
            new: {},
            old: {},
            broken: {},
            defective: [],
            isLoading: false,
            currentString: '',
        })
    }

    const clickSave = () => {
        if (state.isDefectiveContainer) {
            saveDefectiveContainer()
        } else {
            saveNewContainer()
        }
    }

    const saveDefectiveContainer = () => {
        if (!getReadyToSave()) return

        setState({
            ...state,
            isLoading: true,
            currentString: '',
        })

        objContainerMaterial.customSaveDefectiveMaterials(
            state.containerNew, stateUser.user, state.defective, data => {
                if (data.success) {
                    clickReset()
                } else {
                    alert((data.message) ? t(data.message) : t("Invalid Credentials"))
                    setState({
                        ...state,
                        isLoading: false
                    })
                }
            })

    }

    const saveNewContainer = () => {
        if (!getReadyToSave()) return

        setState({
            ...state,
            isLoading: true,
            currentString: '',
        })

        objContainerMaterial.customSaveMaterialsForNewContainer(
            state.containerNew, stateUser.user, state.new, data => {
                if (data.success) {
                    clickReset()
                } else {
                    alert((data.message) ? t(data.message) : t("Invalid Credentials"))
                    setState({
                        ...state,
                        isLoading: false
                    })
                }
            })
    }

    const getReadyToSave = () => {
        return state.containerNew != 0 &&
            (Object.keys(state.new).length > 0 ||
                Object.keys(state.old).length > 0 ||
                Object.keys(state.broken).length > 0 ||
            state.defective.length > 0
            )
    }
    const btnSave = (getReadyToSave()) ? "btn" : "btn btnInactive"

    const loader = (state.isLoading) ? "loader_on" : "loader_off"

    return (
        <div onPaste={onPaste}
             onKeyDown={onKeyDown}
             tabIndex={0} style={{height: "100%"}}
             className="current_page"
        >
            <ContainerPage
                containerNew={state.containerNew}
                containerOld={state.containerOld}
                onScan={onScanContainer}
                fakeScanResult={state.fakeQrContainer}
            />
            {
                (!state.isDefectiveContainer) &&
                <ContainerMaterialPage
                    onScan={onScanMaterials}
                    containerNew={state.containerNew}
                    containerOld={state.containerOld}
                    total={[]}
                    new={state.new}
                    old={state.old}
                    broken={state.broken}
                    fakeScanResult={state.fakeQrMaterail}
                    isScanDisabled={state.containerNew == 0}
                />
            }
            {
                (state.isDefectiveContainer) &&
                <ContainerDefectiveMaterialPage
                    onScan={onScanDefectiveMaterials}
                    containerNew={state.containerNew}
                    fakeScanResult={state.fakeQrDefectiveMaterail}
                    isScanDisabled={state.containerNew == 0}
                    defective={state.defective}
                />
            }
            <div className="buttons_bottom" contentEditable={false}>
                <span className={btnSave} onClick={clickSave}>{t("Done")}</span>
                <span className="btn" onClick={clickReset}>{t("Cancel")}</span>
            </div>

            <div className={loader} contentEditable={false}>
                <div></div>

                <p><FontAwesomeIcon icon={faSpinner} fixedWidth={true} spin={true}/>
                    <br/>
                    Loading...</p>
            </div>

            <div className="nofocus">{t("Please click here to activate the app")}</div>
        </div>
    )
}

export default CurrentPage