import React, {ChangeEvent, useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {FilterValuesType, TaskType} from "./AppWithRedux";

type PropsType = {
    id: string,
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (newFilterValue: FilterValuesType, id: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodoList: (id: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
}

export const TodoList = React.memo((props: PropsType) => {
    console.log('Todolist is called')
    let onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props])
    let onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props])
    let onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props])

    const removeTodoList = useCallback(() => {
        props.removeTodoList(props.id)
    }, [props])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props])

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }, [props])
    let tasksForTodoList = props.tasks

    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(task => task.isDone === false)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(task => task.isDone === true)
    }
    return (
        <div>
            <h3><EditableSpan title={props.title} saveNewTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {tasksForTodoList.map(t => {
                    let removeTask = () => {
                        props.removeTask(t.id, props.id)
                    }
                    let changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, e.currentTarget.checked, props.id)
                    }

                    let changeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(t.id, newTitle, props.id)
                    }
                    return (
                        <div key={t.id}
                             className={t.isDone ? 'is-done' : ''}
                        >
                            <Checkbox
                                size={"small"}
                                color={"primary"}
                                checked={t.isDone}
                                onChange={changeStatus}
                            />
                            <EditableSpan title={t.title} saveNewTitle={changeTaskTitle}/>
                            <IconButton onClick={removeTask}><Delete/>
                            </IconButton>
                        </div>
                    )
                })}
            </div>
            <div>
                <Button
                    size={"small"}
                    variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    color={props.filter === 'all' ? 'secondary' : 'primary'}
                    onClick={onAllClickHandler}
                    className={props.filter === 'all' ? 'active' : ''}
                >All
                </Button>
                <Button
                    size={"small"}
                    variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    color={props.filter === 'active' ? 'secondary' : 'primary'}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    size={"small"}
                    variant={props.filter === "completed" ? 'contained' : 'outlined'}
                    color={props.filter === "completed" ? 'secondary' : 'primary'}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})