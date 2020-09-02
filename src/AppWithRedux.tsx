import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Menu} from "@material-ui/icons";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC, RemoveTodoListAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function AppWithRedux() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const changeFilter = useCallback((newFilterValue: FilterValuesType, todoListId: string) => {
        let action = ChangeTodoListFilterAC(todoListId, newFilterValue)
        dispatch(action)
    }, [dispatch])

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        let action = changeTaskStatusAC(id, isDone, todolistId)
        dispatch(action)
    }, [dispatch])


    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        let action = changeTaskTitleAC(id, newTitle, todolistId)
        dispatch(action)

    }, [dispatch])

    const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) => {
        dispatch(ChangeTodoListTitleAC(newTitle, todoListID))
    }, [dispatch])


    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    }, [dispatch])


    const addTask = useCallback((newTaskName: string, todolistId: string): void => {
        dispatch(addTaskAC(newTaskName, todolistId))
    }, [dispatch])


    const removeTodoList = useCallback((id: string) => {
        let action = RemoveTodoListAC(id)
        dispatch(action)
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        let action = AddTodoListAC(title)
        dispatch(action)
    }, [dispatch])


    return (
        <div className="App">
            <AppBar position="static">
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
            <Container fixed={true}>

                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>{
                    todoLists.map(t => {
                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}} elevation={10}>
                                    <TodoList
                                        key={t.id}
                                        id={t.id}
                                        title={t.title}
                                        tasks={tasks[t.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        filter={t.filter}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                    /></Paper></Grid>
                        )
                    })
                }</Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
