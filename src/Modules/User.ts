import globals from "../Helpers/Globals";
import config from "../Config";
import i18n from "../i18n";
import md5 from 'md5';

export interface IUserModel {
    user_id: number,
    username: string,
    firstname: string,
    lastname: string,
    company_id: number,
    server_id: string,
    beacon_major: number,
    beacon_uuid: string,
    role: string,
    auth_key: string,
    call_api: string,
}

class User {
    login = (username: string, password: string, onResult: (data: any) => void): void => {
        const mypass = md5(password)
        const data = {
            username: username,
            password: mypass,
            language: i18n.language
        }
        globals.postRequest(config.urlEntry + config.urlSuffix + config.urlLogin, data,
            (data: any) => {
                if (data.is_error == 0) {
                    this.loginBackend(data.api + config.urlSuffix, username, mypass, onResult)
                } else {
                    onResult({
                        success: false,
                        message: data.err_msg,
                    })
                }
            },
            (msg: string) => {
                alert("err: "+msg)
                onResult({
                    success: false,
                    message: msg,
                })
            })
    }

    loginBackend = (api: string, username: string, password: string, onResult: (data: any) => void): void => {
        const data = {
            username: username,
            password: password,
            language: i18n.language
        }

        globals.postRequest(api + config.urlLogin, data,
            (data: any) => {
                data.call_api = api
                if (data.is_error == 0) {
                    data.auth_key = data.token
                }
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

    logout = (onResult: () => void) => {
        globals.logout()
        onResult()
    }
}

const objUser = new User()

export default objUser

