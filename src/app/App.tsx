import React, {useCallback, useEffect} from 'react'
import './App.css'
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import LinearProgress from "@material-ui/core/LinearProgress";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializeTC, RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {BrowserRouter, Route} from 'react-router-dom'
import CircularProgress from "@material-ui/core/CircularProgress";
import {logoutTC} from "../features/Login/auth-reducer";

function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeTC())
    }, [])

    const logoutHandlder = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized) {
        return <div style={{top: "30%", textAlign: "center", position: "fixed", width: "100%"}}><CircularProgress/>
        </div>
    }


    return (
        <div className="App">
            <BrowserRouter>
                <AppBar position="static">
                    {status === 'loading' && <LinearProgress color="secondary"/>}
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandlder}>Log out</Button>}
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Route exact path={'/'} render={() => <TodolistsList/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                </Container>
                <ErrorSnackbar/>
            </BrowserRouter>
        </div>
    )
}

export default App
