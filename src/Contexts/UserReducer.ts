import globals from '../Helpers/Globals'
import {IUserModel} from "../Modules/User";

const USER_LOGIN = 'LOGIN'
const USER_LOGOUT = 'LOGOUT'
const USER_FORGOT = 'FORGOT'

export { USER_LOGIN, USER_LOGOUT, USER_FORGOT };

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case USER_LOGIN:

            const data = action.payload.user
            const user = {
                user_id: data.user_id,
                username: data.username,
                firstname: data.firstname,
                lastname: data.lastname,
                company_id: data.company_id,
                server_id: data.server_id,
                beacon_major: data.beacon_major,
                beacon_uuid: data.beacon_uuid,
                role: data.role,
                auth_key: data.auth_key,
                call_api: data.call_api,
            } as IUserModel

            globals.setAuthKey(user.auth_key)
            globals.putStorageJSON("user", user)
            let _state = {
                ...state,
                isAuthenticated: true,
                user: user,
                token: user.auth_key
            }
            return _state;
        case USER_LOGOUT:
            localStorage.clear();
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
            };
        case USER_FORGOT:
            localStorage.clear();
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
            };
        default:
            return state;
    }
};

export default reducer
