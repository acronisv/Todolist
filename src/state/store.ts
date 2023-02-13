import {tasksReducer} from "../reducers/tasks-reducer";
import {todolistsReducer} from "../reducers/todolists-reducer";
import {combineReducers, legacy_createStore} from "redux";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer)

// @ts-ignore
window.store = store;