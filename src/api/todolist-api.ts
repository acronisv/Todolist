import axios from 'axios'

type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

type ResponseType<T = {}> = {
    data: T
    messages: string[]
    resultCode: number
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTaskResponseType = {
    item: TaskType[],
    totalCount: number,
    error: string
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true
})

export const todolistAPI = {
    // Get Todolists
    getTodolists() {
        return instance.get<TodolistType[]>(`/todo-lists`)
            .then((res) => res.data)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(`/todo-lists`, {title})
            .then((res) => res.data)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
            .then((res) => res.data)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title})
            .then((res) => res.data)
    },
    // Get Tasks
    getTodolistTasks(todolistId: string) {
        return instance.get<GetTaskResponseType>(`/todo-lists/${todolistId}/tasks`)
            .then((res) => res.data)
    },
    createTodolistTasks(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title})
            .then((res) => res.data)
    },
    deleteTodolistTasks(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
            .then((res) => res.data)
    },
    updateTodolistTasks(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
            .then((res) => res.data)
    }
}