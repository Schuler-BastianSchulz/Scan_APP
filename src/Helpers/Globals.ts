import request from "superagent";

class Globals {
    auth_key = ""

    constructor() {
        this.auth_key = ""
    }

    log = (message: any, obj?: any) => {
        if (!process.env.REACT_APP_PROD) {
            if (obj) {
                console.log(message, obj)
            } else {
                console.log(message)
            }
        }
    }

    setAuthKey(value: string) {
        this.auth_key = value
    }

    putStorage(key: string, value: string) {
        localStorage.setItem(key, value )
    }

    putStorageJSON(key: string, value: any) {
        this.putStorage(key, JSON.stringify(value) )
    }

    putStorageBool(key: string, value: boolean) {
        if (value) {
            this.putStorage(key, 'true' )
        } else {
            this.putStorage(key, 'false' )
        }
    }

    getStorage(key: string, defaultValue? : string): string {
        let val = localStorage.getItem(key)
        if (!val) val = (defaultValue) ? defaultValue : ""
        return val
    }

    getStorageJSON(key: string): any {
        let res = {}
        try {
            res = JSON.parse(this.getStorage(key))
        } catch (e) {
            res = {}
        }
        return res;
    }


    requestProceed = (req: any, success: any, error: any, any?: any) => {
        let result = req.end((err: any, res: any) => {
            if (res) {
                let response = res

                if (res.status === 401) {
                    // Not Authorized...

                } else {
                    let res
                    if (!response.body) {
                        this.log(response)
                        res = {
                            success: false,
                            message: "Error: " + response.statusText + "(code: " + response.status + ")",
                        }
                    } else {
                        const bSuccess = response.body.is_error == 0
                        let szMessage
                        if (bSuccess) {
                            szMessage = (response.body.message) ? response.body.message : ""
                        } else {
                            szMessage = (response.body.err_msg) ? response.body.err_msg : response.body.error
                        }

                        if (!bSuccess) {
                            if (szMessage == 'unauthorized access') {
                                // unauth...
                                this.logout()
                            }
                        }

                        res = {
                            ...response.body,
                            success: bSuccess,
                            message: szMessage,
                        }
                    }
                    if (success) success(res) // response.body
                }
            } else {
                if (error) {
                    error(err)
                } else {
                    alert('Fatal Error XX: '+err)
                }
            }

            if (any) any()
        })

        return result
    }

    postRequest = (path: string, data: any, success: any, error: any, any?: any) => {
        let req = request.post(path)
            .set('Accept', 'application/json')
            .withCredentials()

        if (this.auth_key) {
            req = req.set('Authorization', 'Bearer ' + this.auth_key)
        }

        if (data) {
            req = req.send(data)
        }

        req = this.requestProceed(req, success, error, any)
        return req;
    }

    logout = () => {
        this.putStorageJSON("user", {})
        this.putStorage("token", "")
        window.location.reload();
    }
}

const globals = new Globals()

export default globals
