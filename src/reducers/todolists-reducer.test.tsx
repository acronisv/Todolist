import React from 'react';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType} from '../app/App';



test('correct todolist should be removed', () => {
    let todoListID_1 = v1();
    let todoListID_2 = v1();

    const startState: Array<TodolistDomainType> = [
        {addedDate:'', id: todoListID_1, order: 0, title: "What to learn", filter: "all", entityStatus: 'idle'},
        {addedDate:'', id: todoListID_2, order: 1, title: "What to buy", filter: "all", entityStatus: 'idle'}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todoListID_1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListID_2);
});

test('correct todolist should be added', () => {
    let todoListID_1 = v1();
    let todoListID_2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistDomainType> = [
        {addedDate:'', id: todoListID_1, order: 0, title: "What to learn", filter: "all", entityStatus: 'idle'},
        {addedDate:'', id: todoListID_2, order: 1, title: "What to buy", filter: "all", entityStatus: 'idle'}
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe("all");
    expect(endState[2].id).toBeDefined();
});

test('correct todolist should change its name', () => {
    let todoListID_1 = v1();
    let todoListID_2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistDomainType> = [
        {addedDate:'', id: todoListID_1, order: 0, title: "What to learn", filter: "all", entityStatus: 'idle'},
        {addedDate:'', id: todoListID_2, order: 1, title: "What to buy", filter: "all", entityStatus: 'idle'}
    ]


    const action = changeTodolistTitleAC(todoListID_2, newTodolistTitle);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todoListID_1 = v1();
    let todoListID_2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodolistDomainType> = [
        {addedDate:'', id: todoListID_1, order: 0, title: "What to learn", filter: "all", entityStatus: 'idle'},
        {addedDate:'', id: todoListID_2, order: 1, title: "What to buy", filter: "all", entityStatus: 'idle'}
    ]

    const action = changeTodolistFilterAC(todoListID_2, newFilter);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


