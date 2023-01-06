import React from 'react';
import './App.css';
import TodoList, {TaskType} from './Todolist';

import AddItemForm from "./AddItemForm";
import {AppBar, Button, IconButton, Paper, Typography, Toolbar, Container, Grid} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

// CRUD
// create +
// read +
// update +
// delete +

// GUI
// CLI

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [todoList_ID: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootState, Array<TodolistType>>(state=>state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state=>state.tasks)



    const removeTask = (taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID))
        // setTasks({...tasks, [todoListID]: tasks[todoListID].filter((el) => el.id !== taskID)})
    }
    const addTask = (title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
        // setTasks({...tasks, [todoListID]: [{id: v1(), title: title, isDone: false}, ...tasks[todoListID]]})
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => { //true
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
        // setTasks({
        //     ...tasks,
        //     [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, isDone: isDone} : el)
        // })
    }
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))
        // setTasks({
        //     ...tasks,
        //     [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, title: title} : el)
        // })
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        dispatch(changeTodolistFilterAC(todoListID, filter))
        // setTodoLists(todoLists.map(el => el.id !== todoListID ? el : {...el, filter: filter}))
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        dispatch(changeTodolistTitleAC(todoListID, title))
        // setTodoLists(todoLists.map(el => el.id !== todoListID ? el : {...el, title: title}))
    }
    const removeTodoList = (todoListID: string) => {
        const action = removeTodolistAC(todoListID)
        dispatch(action)

        // setTodoLists(todoLists.filter(el => el.id !== todoListID))
        // delete tasks[todoListID]
    }
    const addTodoList = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
        // const newTodoListID = v1()
        // const newTodoList: TodolistType = {
        //     id: newTodoListID,
        //     title: title,
        //     filter: "all"
        // }
        // setTodoLists([...todoLists, newTodoList])
        // setTasks({...tasks, [newTodoListID]: []})
    }

    //UI:

    const getTasksForRender = (todolist: TodolistType, tasks: TasksStateType) => {
        let tasksForRender: Array<TaskType>
        switch (todolist.filter) {
            case "completed":
                tasksForRender = tasks[todolist.id].filter(task => task.isDone)
                break
            case "active":
                tasksForRender = tasks[todolist.id].filter(task => !task.isDone)
                break
            default:
                tasksForRender = tasks[todolist.id]
        }
        return tasksForRender
    }

    const todoListComponents = todolists.map((tl:TodolistType) => {
        return (
            <Grid item>
                <Paper style={{padding: '20px'}} elevation={3}>
                    <TodoList
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={getTasksForRender(tl, tasks)}
                        filter={tl.filter}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeTodoListFilter={changeTodoListFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTodoListTitle={changeTodoListTitle}
                        changeTaskTitle={changeTaskTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList} errorColor={"skyblue"}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
