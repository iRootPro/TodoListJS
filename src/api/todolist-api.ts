import axios from "axios"

const ownAxios = axios.create( {
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '65f9b7df-3cf1-4842-b8af-efdce89e120e'
    }
})

type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<T={}> = {
    resultCode: number
    messages: Array<string>
    data: T
}


export const todolistAPI = {
    getTodolists() {
       return  ownAxios.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return ownAxios.post<ResponseType<{item: TodolistType}>>('todo-lists', {title})
    },
    removeTodolist(todolistId: string) {
        return  ownAxios.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTitleTodolist(todolistId: string, title: string) {
        return ownAxios.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    }
}