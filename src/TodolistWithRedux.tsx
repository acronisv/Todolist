import React, {FC, ChangeEvent, useCallback} from 'react';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
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


const TodoListWithRedux: FC<TodoListPropsType> = React.memo((props) => {
    // console.log('Todolist')
    let {id, title, filter} = props.todolist
    let tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[id])
    const dispatch = useDispatch()
    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }

    const tasksItems = tasks.length
        ? tasks.map((task: TaskType) => {
            return <Task key={task.id} task={task} id={id}/>
        })
        : <span>TaskList is empty</span>

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, id))
    }, [dispatch])

    const onClickSetFilterCreator = (filter: FilterValuesType) => () => {
        dispatch(changeTodolistFilterAC(id, filter))
    }

    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(id, title))
    }, [dispatch])

    return (
        <div>
            <h2>
                <EditableSpan title={title} changeTitle={changeTodoListTitle}/>
                <IconButton
                    size='small'
                    onClick={() => dispatch(removeTodolistAC(id))}>
                    <DeleteForeverOutlined/>
                </IconButton>
            </h2>
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
});

export default TodoListWithRedux;

type TaskPropsType = {
    task: TaskType
    id: string
}
export const Task = React.memo((props: TaskPropsType) => {
    let {task, id} = props
    const dispatch = useDispatch()
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, id))
    }
    const changeTaskTitle = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(task.id, title, id))
    }, [dispatch])
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