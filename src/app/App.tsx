import React, {useCallback, useEffect} from 'react';
import './App.css';

import AddItemForm from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, IconButton, Paper, Typography, Toolbar, Container, Grid} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {createTodoTC, getTodoTC, TodolistDomainType} from "../reducers/todolists-reducer";
import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "./store";
import Todolist from "../features/Todolist/Todolist";
import {TaskType} from "../api/todolist-api";

// CRUD
// create +
// read +
// update +
// delete +

// GUI
// CLI

export type FilterValuesType = "all" | "active" | "completed"

export type TasksStateType = {
    [todoList_ID: string]: Array<TaskType>
}

function App() {
    // console.log('App')
    const dispatch = useAppDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
    const addTodoList = useCallback((title: string) => {
        dispatch(createTodoTC(title))
    }, [dispatch])

    const todoListComponents = todolists.map((tl: TodolistDomainType) => {
        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: '20px'}} elevation={3}>
                    <Todolist
                        todolist={tl}
                    />
                </Paper>
            </Grid>
        )
    })

    useEffect(()=>{
        dispatch(getTodoTC())
    }, [])

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

export default App;
