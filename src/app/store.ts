import {tasksReducer} from "../reducers/tasks-reducer";
import {todolistsReducer} from "../reducers/todolists-reducer";
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkDispatch} from 'redux-thunk'
import {useDispatch} from "react-redux";
import {appReducer} from "../reducers/app-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})

export type AppRootState = ReturnType<typeof rootReducer>
type ThunkDispatchType = ThunkDispatch<AppRootState, any, AnyAction>

export const useAppDispatch = () => useDispatch<ThunkDispatchType>()

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store;