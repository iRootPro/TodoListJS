import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setLoggedInAC} from "../features/Login/auth-reducer";
import {handleServerAppError} from "../utils/error-utils";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as errorType,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
        }
        case "APP/SET-IS-INITIALIZED": {
            return {...state, isInitialized: action.value}
        }
        default:
            return state
    }
}

// actions

export const setAppStatusAC = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}

export const setAppErrorAC = (error: string | null) => {
    return {type: 'APP/SET-ERROR', error} as const
}

export const setAppInitializedAC = (value: boolean) => {
    return {type: 'APP/SET-IS-INITIALIZED', value} as const
}

// Thunks

export const initializeTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppInitializedAC(true))
                dispatch(setLoggedInAC(true))
            }
        })
    dispatch(setAppInitializedAC(true))
}

type ActionsType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppInitializedAC>

export type errorType = null | string
type InitialStateType = typeof initialState
