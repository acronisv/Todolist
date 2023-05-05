import {FilterValuesType} from '../App';
import {v1} from 'uuid';
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

export type GetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}
export const todoListID_1 = v1()
export const todoListID_2 = v1()
const initialState: Array<TodolistDomainType> = [
    {addedDate:'', id: todoListID_1, order: 0, title: "What to learn", filter: "all"},
    {addedDate:'', id: todoListID_2, order: 1, title: "What to buy", filter: "all"}
]

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | GetTodolistsActionType

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: action.todolistId, title: action.title, filter: "all", addedDate: '', order: 0}]
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {

            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        }
        case "SET-TODOLISTS": {
            return action.todolists.map((td)=> ({...td, filter: "all"}))
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId}
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId}
}

export const getTodolistsAC = (todolists: Array<TodolistType>):GetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}

export const getTodoTC = () => (dispatch: Dispatch)=> {
    todolistAPI.getTodolists()
        .then((res)=>{
            dispatch(getTodolistsAC(res.data))
        })
}

export const createTodoTC = (title:string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title)
        .then((res)=>{
            dispatch(addTodolistAC(res.data.data.item.title))
        })
}

export const updateTodoTitleTC = (todolistId: string, title:string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolistTitle(todolistId, title)
        .then((res)=>{
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}

export const deleteTodoTC = (todolistId: string) => (dispatch:Dispatch) => {
    todolistAPI.deleteTodolist(todolistId)
        .then((res)=> {
            dispatch(removeTodolistAC(todolistId))
        })
}