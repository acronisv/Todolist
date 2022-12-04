import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>


type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)}
        case 'ADD_TASK':
            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todolistId]]
            }
        case 'CHANGE_TASK_STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id ? {
                    ...el,
                    isDone: action.payload.status
                } : el)
            }
        }
        case 'CHANGE_TASK_TITLE':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id ? {
                    ...el,
                    title: action.payload.title
                } : el)
            }
        case 'ADD-TODOLIST':
            return {
                ...state, [action.todolistId]:[]
            }
        case "REMOVE-TODOLIST":
            // const {[action.id]:[], ...rest} = {...state}
            // return rest
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE_TASK', taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD_TASK', payload: {title, todolistId}} as const
}
export const changeTaskStatusAC = (id: string, status: boolean, todolistId: string) => {
    return {type: 'CHANGE_TASK_STATUS', payload: {id, status, todolistId}} as const
}
export const changeTaskTitleAC = (id: string, title: string, todolistId: string) => {
    return {type: 'CHANGE_TASK_TITLE', payload: {id, title, todolistId}} as const
}


