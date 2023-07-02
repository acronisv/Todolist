import React from "react";
import {Provider} from "react-redux";
import {AppRootState} from "../../app/store";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "../../reducers/todolists-reducer";
import {tasksReducer} from "../../reducers/tasks-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";
import thunk from "redux-thunk";
import {appReducer} from "../../reducers/app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialGlobalState:AppRootState = {
    todolists: [
        {addedDate:'', id: "todoListID_1", order: 0, title: "What to learn", filter: "all", entityStatus: 'idle'},
        {addedDate:'', id: "todoListID_2", order: 1, title: "What to buy", filter: "all", entityStatus: 'idle'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
                startDate: '', deadline:'', addedDate:'', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: 'JS', status: TaskStatuses.New, todoListId: 'todolistId1', description: '',
                startDate: '', deadline:'', addedDate:'', order: 0, priority: TaskPriorities.Low}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', status: TaskStatuses.Completed, todoListId: 'todolistId2', description: '',
                startDate: '', deadline:'', addedDate:'', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: 'React Book', status: TaskStatuses.Completed, todoListId: 'todolistId2', description: '',
                startDate: '', deadline:'', addedDate:'', order: 0, priority: TaskPriorities.Low}
        ]
    },
    app: {
        status:'idle',
        error: null

    }
}

export const storyBookStore = createStore(rootReducer, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}