import React, {useState} from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {errorType, setAppErrorAC} from "../../app/app-reducer";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export function ErrorSnackbar() {

    const error = useSelector<AppRootStateType, errorType>(state => state.app.error)
    const dispatch = useDispatch()
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC(null))
    }

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>

    )
}
