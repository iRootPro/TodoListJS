import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./App";

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
}

export function TodoList(props: PropsType) {

    let [newTitleTask, setNewTitleTask] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    let addTask = () => {
        if (newTitleTask.trim()) {
            props.addTask(newTitleTask.trim(), props.id)
            setNewTitleTask('')
        } else {
            setError('Title is required!')
        }

    }
    let onTaskNameChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitleTask(e.currentTarget.value)
        setError(null)
    }
    let onAddTaskNameKeyPressed = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) addTask()
    }
    let onAllClickHandler = () => props.changeFilter('all', props.id)
    let onActiveClickHandler = () => props.changeFilter('active', props.id)
    let onCompletedClickHandler = () => props.changeFilter('completed', props.id)


    function removeTodoList() {
        props.removeTodoList(props.id)
    }
    return (
        <div>
            <h3>{props.title}<button onClick={removeTodoList}>x</button></h3>
            <div>
                <input className={error ? 'error' : ''} type={'text'}
                       value={newTitleTask}
                       onChange={onTaskNameChanged}
                       onKeyPress={onAddTaskNameKeyPressed}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    let removeTask = () => {
                        props.removeTask(t.id, props.id)
                    }
                    let changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    return (
                        <li key={t.id}
                            className={t.isDone ? 'is-done' : ''}
                        >
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={changeStatus}
                            />
                            <span>{t.title}</span>
                            <button onClick={removeTask}>x
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}
                        className={props.filter === 'all' ? 'active' : ''}
                >All
                </button>
                <button className={props.filter === 'active' ? 'active' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}