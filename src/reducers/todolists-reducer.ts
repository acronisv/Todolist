import {FilterValuesType} from '../app/App';
import {v1} from 'uuid';
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC, setErrorAC} from "./app-reducer";


const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: action.todolistId, title: action.title, filter: "all", addedDate: '', order: 0, entityStatus: 'idle'},]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        case 'SET-TODOLISTS':
            return action.todolists.map((td)=> ({...td, filter: "all", entityStatus: 'idle'}))
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl=>tl.id === action.todolistId ? {...tl, entityStatus: action.status} : tl)
        default:
            return state
    }
}

// Actions
export const removeTodolistAC = (todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (title: string) =>
    ({type: 'ADD-TODOLIST', title: title, todolistId: v1()} as const)
export const changeTodolistTitleAC = (todolistId: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId} as const)
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId} as const)
export const getTodolistsAC = (todolists: Array<TodolistType>) =>
    ({type: 'SET-TODOLISTS', todolists} as const)
export const changeTodolistEntityStatusAC = (todolistId: string, status: RequestStatusType) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS',todolistId, status} as const)



// Thunks
export const getTodoTC = () => (dispatch: Dispatch<TodolistActionsType>)=> {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolists()
        .then((res)=>{
            dispatch(getTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const createTodoTC = (title:string) => (dispatch: Dispatch<TodolistActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then((res)=>{
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item.title))
                dispatch(setAppStatusAC('succeeded'))
            }
            else {
                res.data.messages.length
                    ? dispatch(setErrorAC(res.data.messages[0]))
                    : dispatch(setErrorAC('error'))
            }
        })
}

export const updateTodoTitleTC = (todolistId: string, title:string) => (dispatch: Dispatch<TodolistActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodolistTitle(todolistId, title)
        .then((res)=>{
            dispatch(changeTodolistTitleAC(todolistId, title))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const deleteTodoTC = (todolistId: string) => (dispatch:Dispatch<TodolistActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistAPI.deleteTodolist(todolistId)
        .then((res)=> {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'))
        })
}

// Types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type GetTodolistActionType =  ReturnType<typeof getTodolistsAC>

type TodolistActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | GetTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>


export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}