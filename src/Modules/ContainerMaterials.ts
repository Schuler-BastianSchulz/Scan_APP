import globals from "../Helpers/Globals";
import config from "../Config";
import i18n from "../i18n";
import md5 from 'md5';
import {IUserModel} from "./User";

export interface IContainerMaterialModel {
    container: string,
    color: string,
}

class ContainerMaterials {
    customValidateMaterialsForNewContainer = (container: number, user: IUserModel, materials: any[], filename: string, onResult: (data: any) => void): void => {
        const data = {
            container_number: container,
            materials: materials,
            filename: filename,
        }

        globals.postRequest(user.call_api + config.urlCustomValidateMaterialsForNewContainer, data,
            (data: any) => {
                onResult(data)
            },
            (msg: string) => {
                onResult({
                    success: false,
                    message: msg,
                })
            })
    }

    customSaveMaterialsForNewContainer = (container: number, user: IUserModel, materials: {}, onResult: (data: any) => void): void => {
        const data = {
            container_number: container,
            materials: materials,
        }

        globals.postRequest(user.call_api + config.urlCustomSaveMaterialsForNewContainer, data,
            (data: any) => {
                onResult(data)
            },
            (msg: string) => {
                alert("err: "+msg)
                onResult({
                    success: false,
                    message: msg,
                })
            })
    }

    customSaveDefectiveMaterials = (container: number, user: IUserModel, materials: string[], onResult: (data: any) => void): void => {
        const data = {
            container_number: container,
            materials: materials,
        }

        globals.postRequest(user.call_api + config.urlCustomSaveDevectiveMaterials, data,
            (data: any) => {
                onResult(data)
            },
            (msg: string) => {
                alert("err: "+msg)
                onResult({
                    success: false,
                    message: msg,
                })
            })
    }




}

const objContainer = new ContainerMaterials()

export default objContainer

