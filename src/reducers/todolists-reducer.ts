import {FilterValuesType, TodolistType} from "../../../../Todolist lessons/it-incubator-todolist-ts-08/src/App";
import {v1} from "uuid";

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}

type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
}

type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (todolists: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(el=>el.id!==action.id)
        case 'ADD-TODOLIST':
            let newTodolistId = v1();
            let newTodolist: TodolistType = {id: newTodolistId, title: action.title, filter: 'all'};
            return [...todolists, newTodolist]
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(el=> el.id==action.id ? {...el, title: action.title} : el)
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(el=> el.id===action.id ? {...el, filter: action.filter} : el)
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const RemoveTodoListAC = (id: string):RemoveTodoListAT => ({
    type: "REMOVE-TODOLIST",
    id
})

export const AddTodoListAC = (title: string):AddTodoListAT => ({
    type: 'ADD-TODOLIST',
    title
})

export const ChangeTodolistTitleAC = (id: string, title: string):ChangeTodolistTitleAT => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
})

export const ChangeTodolistFilterAC = (id: string,filter:FilterValuesType):ChangeTodolistFilterAT => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
})
