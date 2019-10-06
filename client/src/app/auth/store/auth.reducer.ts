import * as AuthActions from './auth.actions';

const initialState = {
    user: localStorage.getItem('userName')
}

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case AuthActions.LOGIN:
            return {
                ...state,
                user: action.payload
            }
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            }
        default:
            return state
    }

}