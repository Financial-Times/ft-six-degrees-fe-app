import { LOGIN_STATE_CHANGE } from './action-types';

export const loginStateUpdate = (status) => {
    return {
        type: LOGIN_STATE_CHANGE,
        loginState: status
    };
};
