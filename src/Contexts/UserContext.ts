import React, {Dispatch} from 'react';

export type UserContextProps = {
    stateUser: any,
    dispatchUser: any,
    logout: any
};

const userContext = React.createContext<Partial<UserContextProps>>({})

export default userContext

