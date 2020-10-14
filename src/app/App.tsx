import React from 'react'
import './App.css'
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import LinearProgress from "@material-ui/core/LinearProgress";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {BrowserRouter, Route} from 'react-router-dom'

function App() {
const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

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
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                    <Route exact path={'/'} render={() => <TodolistsList/> }/>
                    <Route path={'/login'} render={() => <Login/>}/>
            </Container>
            <ErrorSnackbar/>
            </BrowserRouter>
        </div>
    )
}

export default App
