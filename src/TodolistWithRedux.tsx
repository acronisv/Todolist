import React, {FC, ChangeEvent} from 'react';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {BackspaceOutlined, DeleteForeverOutlined} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {FilterValuesType} from "./AppWithRedux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./reducers/todolists-reducer";
import {TodolistType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todolist: TodolistType
}


const TodoListWithRedux: FC<TodoListPropsType> = (props) => {
    let {id, title, filter} = props.todolist
    let tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[id])
    const dispatch = useDispatch()
    if (filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }

    const tasksItems = tasks.length
        ? tasks.map((task: TaskType) => {
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, id))
            }
            const changeTaskTitle = (title: string) => {
                dispatch(changeTaskTitleAC(task.id, title, id))
            }
            const removeTask = () => {
                dispatch(removeTaskAC(task.id, id))
            }
            return (
                <ListItem key={task.id} className={task.isDone ? "isDone" : ""}>
                    <Checkbox
                        onChange={changeTaskStatus}
                        checked={task.isDone}
                    />
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    <IconButton size='small' onClick={removeTask}>
                        <BackspaceOutlined/>
                    </IconButton>
                </ListItem>
            )
        })
        : <span>TaskList is empty</span>

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, id))
    }

    const onClickSetFilterCreator = (filter: FilterValuesType) => () => {
        dispatch(changeTodolistFilterAC(id, filter))
    }

    const changeTodoListTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(id, title))
    }

    return (
        <div>
            <Typography variant={'h5'} align={"center"} paragraph={true}>
                <EditableSpan title={title} changeTitle={changeTodoListTitle}/>
                <IconButton
                    size='small'
                    onClick={() => dispatch(removeTodolistAC(id))}>
                    <DeleteForeverOutlined/>
                </IconButton>
            </Typography>
            <AddItemForm addItem={addTask} errorColor={"hotpink"}/>
            <List>
                {tasksItems}
            </List>
            <div>
                <ButtonGroup
                    variant='contained'
                    size='small'
                    disableElevation>
                    <Button
                        color={filter === "all" ? "secondary" : "primary"}
                        onClick={onClickSetFilterCreator("all")}
                    >All
                    </Button>
                    <Button
                        color={filter === "active" ? "secondary" : "primary"}
                        onClick={onClickSetFilterCreator("active")}
                    >Active
                    </Button>
                    <Button
                        color={filter === "completed" ? "secondary" : "primary"}
                        onClick={onClickSetFilterCreator("completed")}
                    >Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
};

export default TodoListWithRedux;