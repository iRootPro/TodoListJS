import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api"

export const handleServerAppError = (data:ResponseType, dispatch: Dispatch<DispatchActionType>) => {
    {
        if (data.messages.length) {
            dispatch(setAppErrorAC(data.messages[0]))
        } else {
            dispatch(setAppErrorAC('Some error occurred'))
        }
        dispatch(setAppStatusAC('failed'))
    }
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC>>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}

type DispatchActionType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
