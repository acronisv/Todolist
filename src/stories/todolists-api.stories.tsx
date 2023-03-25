import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists().then((data) => setState(data))

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const title = 'What to eat'
    useEffect(() => {
        todolistAPI.createTodolist(title).then((data) => setState(data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '012571ac-8c6a-4d15-986a-40a603292738'
    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId).then((data) => setState(data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const title = 'React'
    const todolistId = 'e971c8a1-ce54-4612-9a48-64b1b830660a'
    useEffect(() => {
        todolistAPI.updateTodolistTitle(todolistId, title).then((data) => setState(data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTodolistTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '19c6d7ae-5d07-405c-b7a4-ed67b011ac09'
        todolistAPI.getTodolistTasks(todolistId).then((data) => setState(data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolistTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'React'
        const todolistId = '19c6d7ae-5d07-405c-b7a4-ed67b011ac09'
        todolistAPI.createTodolistTasks(todolistId, title).then((data) => setState(data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolistTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '19c6d7ae-5d07-405c-b7a4-ed67b011ac09'
        const taskId = '9ae4919a-3a93-4d36-8527-eb180ad63bd9'
        todolistAPI.deleteTodolistTasks(todolistId, taskId).then((data) => setState(data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '19c6d7ae-5d07-405c-b7a4-ed67b011ac09'
        const taskId = '8e92ef01-172c-41f8-868c-ae48a883e665'
        const title = 'HTML'
        todolistAPI.updateTodolistTasks(todolistId, taskId, title).then((data) => setState(data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

