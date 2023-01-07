import React from 'react';
import './App.css';
import {TaskType} from './Todolist';

import AddItemForm from "./AddItemForm";
import {AppBar, Button, IconButton, Paper, Typography, Toolbar, Container, Grid} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTodolistAC} from "./reducers/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import TodolistWithRedux from "./TodolistWithRedux";

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
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    const addTodoList = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    const todoListComponents = todolists.map((tl: TodolistType) => {
        return (
            <Grid item>
                <Paper style={{padding: '20px'}} elevation={3}>
                    <TodolistWithRedux
                        todolist={tl}
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
