import React from "react";
import {Provider} from "react-redux";
import {AppRootState} from "../../app/store";
import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "../../reducers/todolists-reducer";
import {tasksReducer} from "../../reducers/tasks-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    // todolists: [
    //     {addedDate:'', id: todoListID_1, order: 0, title: "What to learn", filter: "all"},
    //     {addedDate:'', id: todoListID_2, order: 1, title: "What to buy", filter: "all"}
    // ],
    // tasks: {
    //     ['todolistId1']: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true}
    //     ],
    //     ['todolistId2']: [
    //         {id: v1(), title: 'Milk', isDone: true},
    //         {id: v1(), title: 'React Book', isDone: true}
    //     ]
    // }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState)

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}