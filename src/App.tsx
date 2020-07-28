import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}


function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {
            id: todolistId1,
            title: 'What to learn',
            filter: "all"
        },
        {
            id: todolistId2,
            title: 'What to buy',
            filter: "active"
        }
    ])

    let [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: false},
        ]
    })

    function changeFilter(newFilterValue: FilterValuesType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = newFilterValue
        }
        setTodoLists([...todoLists])
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasks})
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.title = newTitle
        }
        setTasks({...tasks})
    }

    function changeTodoListTitle(todoListID: string, newTitle: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    function removeTask(taskId: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id != taskId)
        setTasks({...tasks})
    }

    function addTask(newTaskName: string, todolistId: string): void {
        let newTask = {id: v1(), title: newTaskName, isDone: false}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }

    function removeTodoList(id: string) {
        let filteredTodoList = todoLists.filter(tl => tl.id != id)
        setTodoLists(filteredTodoList)
        delete tasks[id]
        setTasks({...tasks})
    }

    function addTodoList(title: string) {
        let newTodoListID = v1()
        let newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({
            ...tasks, [newTodoListID]: []
        })
    }


    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todoLists.map(t => {
                    let allTodolistTasks = tasks[t.id]
                    let tasksForTodoList = allTodolistTasks
                    if (t.filter === 'active') {
                        tasksForTodoList = allTodolistTasks.filter(task => task.isDone === false)
                    }
                    if (t.filter === 'completed') {
                        tasksForTodoList = allTodolistTasks.filter(task => task.isDone === true)
                    }
                    return (
                        <TodoList
                            key={t.id}
                            id={t.id}
                            title={t.title}
                            tasks={tasksForTodoList}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={t.filter}
                            removeTodoList={removeTodoList}
                            changeTaskTitle={changeTaskTitle}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
