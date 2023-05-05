import {TasksStateType} from '../App';
import {
    AddTodolistActionType,
    GetTodolistsActionType,
    RemoveTodolistActionType,

} from "./todolists-reducer";
import {Dispatch} from "redux";
import {TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../api/todolist-api";
import {AppRootState} from "../state/store";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>


type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | GetTodolistsActionType
    | SetTasksActionType

const initialState: TasksStateType = {
    // [todoListID_1]: [
    //     {id: v1(), title: "HTML", isDone: true},
    //     {id: v1(), title: "CSS", isDone: true},
    //     {id: v1(), title: "JS/TS", isDone: false},
    // ],
    // [todoListID_2]: [
    //     {id: v1(), title: "Book", isDone: true},
    //     {id: v1(), title: "Tea", isDone: true},
    //     {id: v1(), title: "Beer", isDone: false},
    // ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            let stateCopy = {...state}
            action.todolists.forEach(td => stateCopy[td.id] = [])
            return stateCopy
        }
        case "SET-TASKS": {
            return {...state, [action.todolistId]: action.tasks}
        }
        case 'REMOVE_TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)}
        case 'ADD_TASK':
            return {
                ...state, [action.payload.todolistId]:[action.payload.task, ...state[action.payload.todolistId]]
            }
        case 'CHANGE_TASK_STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id ? {
                    ...el,
                    status: action.payload.status
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
                ...state, [action.todolistId]: []
            }
        case "REMOVE-TODOLIST":
            // const {[action.id]:[], ...rest} = {...state}
            // return rest
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE_TASK', taskId, todolistId} as const
}
export const addTaskAC = (task: TaskType, todolistId: string) => {
    return {type: 'ADD_TASK', payload: {task, todolistId}} as const
}
export const changeTaskStatusAC = (id: string, status: TaskStatuses, todolistId: string) => {
    return {type: 'CHANGE_TASK_STATUS', payload: {id, status, todolistId}} as const
}
export const changeTaskTitleAC = (id: string, title: string, todolistId: string) => {
    return {type: 'CHANGE_TASK_TITLE', payload: {id, title, todolistId}} as const
}
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {type: 'SET-TASKS', todolistId, tasks} as const
}

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch)=> {
    todolistAPI.getTodolistTasks(todolistId)
        .then((res)=>{
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolistTasks(todolistId, taskId)
        .then((res)=>{
            dispatch(removeTaskAC(taskId, todolistId))
        })
}

export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolistTasks(todolistId, title)
        .then((res)=>{
            dispatch(addTaskAC(res.data.data.item, todolistId))
        })
}

export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootState) => {
    const task = getState().tasks[todolistId].find(el=>el.id===taskId)
    if (task) {
        const model : UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }
        todolistAPI.updateTodolistTasks(todolistId, taskId, model)
            .then((res)=> {
                dispatch(changeTaskStatusAC(taskId, status, todolistId))
            })
    }

}

export const changeTaskTitleTC = (todolistId: string, taskId: string, title: string) => (dispatch: Dispatch, getState: () => AppRootState) => {
    const task = getState().tasks[todolistId].find(el=>el.id===taskId)
    if (task) {
        const model: UpdateTaskModelType = {
            title: title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }
        todolistAPI.updateTodolistTasks(todolistId, taskId, model)
            .then((res) => {
                dispatch(changeTaskTitleAC(taskId, title, todolistId))
            })
    }
}

