import React, {useReducer} from 'react';
import './App.css';
import TodoList, {TaskType} from './Todolist';
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, IconButton, Paper, Typography, Toolbar, Container, Grid} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";

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

function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, dispatchToTodolist] = useReducer(todolistsReducer, [
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"}
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Tea", isDone: true},
            {id: v1(), title: "Beer", isDone: false},
        ]
    })



    const removeTask = (taskID: string, todoListID: string) => {
        dispatchToTasks(removeTaskAC(taskID, todoListID))
        // setTasks({...tasks, [todoListID]: tasks[todoListID].filter((el) => el.id !== taskID)})
    }
    const addTask = (title: string, todoListID: string) => {
        dispatchToTasks(addTaskAC(title, todoListID))
        // setTasks({...tasks, [todoListID]: [{id: v1(), title: title, isDone: false}, ...tasks[todoListID]]})
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => { //true
        dispatchToTasks(changeTaskStatusAC(taskID, isDone, todoListID))
        // setTasks({
        //     ...tasks,
        //     [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, isDone: isDone} : el)
        // })
    }
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        dispatchToTasks(changeTaskTitleAC(taskID, title, todoListID))
        // setTasks({
        //     ...tasks,
        //     [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, title: title} : el)
        // })
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        dispatchToTodolist(changeTodolistFilterAC(todoListID, filter))
        // setTodoLists(todoLists.map(el => el.id !== todoListID ? el : {...el, filter: filter}))
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        dispatchToTodolist(changeTodolistTitleAC(todoListID, title))
        // setTodoLists(todoLists.map(el => el.id !== todoListID ? el : {...el, title: title}))
    }
    const removeTodoList = (todoListID: string) => {
        const action = removeTodolistAC(todoListID)
        dispatchToTodolist(action)
        dispatchToTasks(action)
        // setTodoLists(todoLists.filter(el => el.id !== todoListID))
        // delete tasks[todoListID]
    }
    const addTodoList = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTasks(action)
        dispatchToTodolist(action)
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

    const todoListComponents = todoLists.map((tl:TodolistType) => {
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

export default App;
